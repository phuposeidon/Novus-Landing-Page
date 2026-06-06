/**
 * Agent discovery API routes (OAuth registration, x402, commerce stubs).
 * Served by Astro middleware on the Cloudflare Worker.
 */

import { SHOPIFY_INSTALL_URL } from "../config/site.ts";

const ISSUER = "https://nexiscro.com";
const PUBLIC_SCOPE = "content.read";
const PUBLIC_CLIENT_ID = "nexiscro-public-agent";

function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Access-Control-Allow-Origin", "*");
  return new Response(JSON.stringify(data, null, 2) + "\n", { ...init, headers });
}

function toBase64Json(value: unknown): string {
  const text = JSON.stringify(value);
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function x402PaymentRequired(pathname: string): Response {
  const paymentRequired = {
    x402Version: 2,
    error: "Payment required",
    resource: {
      url: `${ISSUER}${pathname}`,
      description: "Nexis CRO Pro/Growth subscription - purchase via Shopify App Store billing",
      mimeType: "application/json",
    },
    accepts: [
      {
        scheme: "exact",
        network: "shopify:managed_billing",
        amount: "2900",
        asset: "USD",
        payTo: SHOPIFY_INSTALL_URL,
        maxTimeoutSeconds: 3600,
        extra: {
          name: "Nexis CRO Pro (monthly)",
          version: "1",
          handoff: `${ISSUER}/.well-known/acp.json`,
        },
      },
    ],
  };
  const encoded = toBase64Json(paymentRequired);
  return new Response(JSON.stringify({ error: "payment_required", message: "Subscribe via Shopify App Store" }), {
    status: 402,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "PAYMENT-REQUIRED": encoded,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function handleAgentRoutes(request: Request, pathname: string): Response | null {
  const method = request.method.toUpperCase();

  if (pathname === "/api/agent-auth/register" && method === "POST") {
    return json({
      client_id: PUBLIC_CLIENT_ID,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      grant_types: ["client_credentials"],
      token_endpoint_auth_method: "none",
      scope: PUBLIC_SCOPE,
      identity_type: "anonymous",
    }, { status: 201 });
  }

  if (pathname === "/api/agent-auth/register" && method === "GET") {
    return json({
      registration_endpoint: `${ISSUER}/api/agent-auth/register`,
      methods: ["POST"],
      identity_types_supported: ["anonymous"],
    });
  }

  if (pathname === "/api/agent-auth/token" && method === "POST") {
    return json({
      access_token: "nexiscro-public-content-read",
      token_type: "Bearer",
      scope: PUBLIC_SCOPE,
      expires_in: 86400,
    });
  }

  if (pathname === "/api/agent-auth/claim" && method === "GET") {
    return json({
      issuer: ISSUER,
      identity_type: "anonymous",
      scope: PUBLIC_SCOPE,
      instructions: "Public marketing content requires no credential. Use token endpoint for structured agent access.",
      documentation: `${ISSUER}/auth.md`,
    });
  }

  if (pathname === "/api/agent-auth/authorize" && method === "GET") {
    return json({
      message: "Public content does not require authorization. Use client_credentials at token endpoint for bearer access.",
      token_endpoint: `${ISSUER}/api/agent-auth/token`,
    });
  }

  if (pathname === "/api/agent-premium" && method === "GET") {
    const paymentSig = request.headers.get("PAYMENT-SIGNATURE");
    if (paymentSig) {
      return json({
        message: "Payment handoff - complete subscription in Shopify Admin after app install",
        install: SHOPIFY_INSTALL_URL,
        plans: `${ISSUER}/#pricing`,
      });
    }
    return x402PaymentRequired(pathname);
  }

  if (pathname === "/api/agent-premium" && method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, PAYMENT-SIGNATURE, Accept",
      },
    });
  }

  return null;
}
