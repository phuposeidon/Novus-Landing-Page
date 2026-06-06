#!/usr/bin/env node
/**
 * Publish DNS-AID SVCB/HTTPS records for nexiscro.com via Cloudflare API.
 *
 * Requires CLOUDFLARE_API_TOKEN (or CF_API_TOKEN) with:
 *   - Zone → DNS → Edit
 *   - Zone → DNSSEC → Edit
 * Scoped to the nexiscro.com zone.
 *
 * Wrangler OAuth (zone:read) cannot create DNS records — use a dedicated API token:
 * https://dash.cloudflare.com/profile/api-tokens
 * Template: "Edit zone DNS" → Include → Specific zone → nexiscro.com
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... npm run dns-aid
 */
const ZONE_NAME = "nexiscro.com";
const DOH = "https://cloudflare-dns.com/dns-query";

/** @see draft-mozleywilliams-dnsop-dnsaid, isitagentready dns-aid skill */
const RECORDS = [
  {
    name: "_index._agents",
    type: "HTTPS",
    data: {
      priority: 1,
      target: ZONE_NAME,
      value: 'alpn="h2,h3" port=443',
    },
    comment: "DNS-AID index entrypoint (_index._agents)",
  },
  {
    name: "_a2a._agents",
    type: "HTTPS",
    data: {
      priority: 1,
      target: ZONE_NAME,
      value: 'alpn="a2a" port=443 mandatory=alpn,port',
    },
    comment: "DNS-AID A2A agent endpoint (_a2a._agents)",
  },
];

function token() {
  return process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN || "";
}

async function cf(path, init = {}) {
  const auth = token();
  if (!auth) {
    printManualInstructions();
    process.exit(1);
  }
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(JSON.stringify(body.errors || body, null, 2));
  }
  return body.result;
}

function fqdn(label) {
  return `${label}.${ZONE_NAME}`;
}

async function upsertRecord(zoneId, spec) {
  const fullName = fqdn(spec.name);
  const existing = await cf(
    `/zones/${zoneId}/dns_records?type=${spec.type}&name=${encodeURIComponent(fullName)}`,
  );
  const payload = {
    type: spec.type,
    name: spec.name,
    data: spec.data,
    ttl: 3600,
    proxied: false,
    comment: spec.comment,
  };

  if (existing.length > 0) {
    await cf(`/zones/${zoneId}/dns_records/${existing[0].id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    console.log(`Updated ${spec.type} ${fullName}`);
    return;
  }

  await cf(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  console.log(`Created ${spec.type} ${fullName}`);
}

async function enableDnssec(zoneId) {
  const status = await cf(`/zones/${zoneId}/dnssec`);
  if (status?.status === "active") {
    console.log("DNSSEC already active");
    return;
  }
  await cf(`/zones/${zoneId}/dnssec`, {
    method: "PATCH",
    body: JSON.stringify({ status: "active" }),
  });
  console.log("DNSSEC enabled — add DS records at your registrar if prompted");
}

async function dohQuery(name, type = "SVCB") {
  const url = `${DOH}?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetch(url, { headers: { accept: "application/dns-json" } });
  return res.json();
}

async function verifyRecords() {
  console.log("\nVerifying via DNS-over-HTTPS (may take up to 60s to propagate)...");
  for (let attempt = 1; attempt <= 12; attempt++) {
    let allOk = true;
    for (const spec of RECORDS) {
      const name = fqdn(spec.name);
      const body = await dohQuery(name, "SVCB");
      const ok = body.Status === 0 && Array.isArray(body.Answer) && body.Answer.length > 0;
      const ad = body.AD === true;
      console.log(
        `  ${name}: ${ok ? "found" : "NXDOMAIN/missing"}${ok ? `, AD=${ad}` : ""}`,
      );
      if (!ok) allOk = false;
    }
    if (allOk) {
      const indexBody = await dohQuery(fqdn("_index._agents"), "SVCB");
      if (indexBody.AD) {
        console.log("\nDNS-AID records live with DNSSEC authenticated data (AD=true).");
      } else {
        console.log(
          "\nRecords found. AD=false — DNSSEC may still be propagating (retry scan in a few minutes).",
        );
      }
      return;
    }
    if (attempt < 12) await sleep(5000);
  }
  console.warn("\nRecords not visible yet. Check Cloudflare DNS dashboard and retry:");
  console.warn(`  curl -s "${DOH}?name=_index._agents.${ZONE_NAME}&type=SVCB" -H "accept: application/dns-json"`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function printManualInstructions() {
  console.error(`
No CLOUDFLARE_API_TOKEN / CF_API_TOKEN set.

Option A — API token + script (recommended)
  1. Create token: https://dash.cloudflare.com/profile/api-tokens
     Permissions: Zone → DNS Edit, Zone → DNSSEC Edit (zone: nexiscro.com)
  2. Run: CLOUDFLARE_API_TOKEN=your_token npm run dns-aid

Option B — Cloudflare Dashboard (manual)
  1. https://dash.cloudflare.com → nexiscro.com → DNS → Add record
  2. Type: HTTPS | Name: _index._agents | Priority: 1 | Target: nexiscro.com
     Value: alpn="h2,h3" port=443 | Proxy: DNS only
  3. Add second HTTPS record | Name: _a2a._agents | Target: nexiscro.com
     Value: alpn="a2a" port=443 mandatory=alpn,port | Proxy: DNS only
  4. DNS → Settings → DNSSEC → Enable

Verify:
  curl -s "${DOH}?name=_index._agents.${ZONE_NAME}&type=SVCB" -H "accept: application/dns-json"
`);
}

async function main() {
  const zones = await cf(`/zones?name=${ZONE_NAME}`);
  const zone = zones.find((z) => z.name === ZONE_NAME);
  if (!zone) throw new Error(`Zone not found: ${ZONE_NAME}`);
  console.log(`Zone ${ZONE_NAME} id=${zone.id}`);

  for (const record of RECORDS) {
    await upsertRecord(zone.id, record);
  }

  await enableDnssec(zone.id);
  await verifyRecords();
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
