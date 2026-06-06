#!/usr/bin/env node
/**
 * Regenerate public/llms.txt — curated AI context map for nexiscro.com
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const outPath = path.join(root, "public/llms.txt");
const site = "https://nexiscro.com";

function parseField(content, key) {
  const m = content.match(new RegExp(`${key}:\\s*["']?([^"'\n]+)`));
  return m?.[1]?.trim() ?? null;
}

function isDraft(content) {
  return /draft:\s*true/.test(content);
}

const blogFiles = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
const guides = [];

for (const file of blogFiles) {
  const content = await readFile(path.join(blogDir, file), "utf8");
  if (isDraft(content)) continue;
  const slug = file.replace(/\.md$/, "");
  const title = parseField(content, "title");
  const description = parseField(content, "description");
  guides.push({
    slug,
    title: title ?? slug,
    description: description ?? "",
    pubDate: parseField(content, "pubDate") ?? "",
  });
}

guides.sort((a, b) => b.pubDate.localeCompare(a.pubDate));

const guideLines = guides
  .map((g) => {
    const desc = g.description ? `: ${g.description.slice(0, 120)}` : "";
    return `- [${g.title}](${site}/blog/${g.slug}/)${desc}`;
  })
  .join("\n");

const body = `# Nexis CRO
> AI SEO and AEO audit app for Shopify. Audits ChatGPT, Perplexity, and Google AI visibility; deploys llms.txt, JSON-LD schema, and AI Rank Tracker.

## Product
- [Homepage](${site}/): Features, pricing, install CTA
- [Install on Shopify](https://apps.shopify.com/partners/nexis-cro): Free plan, no credit card
- [Pricing](${site}/#pricing): Free, Pro ($29), Growth ($59), Agency ($149)
- [Features](${site}/#features): AI audit, schema blocks, llms.txt, rank tracker
- [FAQ](${site}/#faq): AEO, credits, llms.txt explained

## Guides (AEO / GEO for Shopify merchants)
- [All guides](${site}/blog/): Answer Engine Optimization playbooks
${guideLines}

## Legal
- [Privacy Policy](${site}/privacy)

## Optional
- [Agent skills index](${site}/.well-known/agent-skills/index.json): MCP/agent discovery
`;

await writeFile(outPath, body, "utf8");
console.log(`Wrote ${outPath} (${guides.length} guide links)`);
