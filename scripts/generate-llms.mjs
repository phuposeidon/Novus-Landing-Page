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
> AI SEO, AEO audit, and storefront conversion apps for Shopify merchants. Audits ChatGPT, Perplexity, and Google AI visibility; deploys llms.txt, JSON-LD schema, AI Rank Tracker, and Quiz Signal recommendation funnels.

## Apps

### Nexis CRO: AI SEO & AEO Audit
- [Overview](${site}/#ai-seo): ChatGPT, Perplexity, and Google AI search optimization for Shopify
- [Install on Shopify](https://apps.shopify.com/nexis-cro-ai-seo-aeo-audit): Free plan available, no credit card required
- [Pricing](${site}/#pricing): Free ($0), Pro ($29), Growth ($59), Agency ($149)
- [Features](${site}/#features): AI audit, schema blocks, llms.txt generator, AI Rank Tracker
- [FAQ](${site}/#faq): AEO, AI credits, schema markup, and llms.txt explained

### Nexis CRO: Quiz Signal
- [Product Hub](${site}/quizsignal/): Storefront product recommendation quizzes that convert shopper answers into sales
- [Install on Shopify](https://apps.shopify.com/nexis-cro-quiz-signal): Free forever plan, 14-day trial on Growth
- [Pricing](${site}/quizsignal/pricing/): Free ($0 forever), Growth ($9/month)
- [Guides](${site}/quizsignal/guides/): Recommendation rules, Klaviyo sync, and quiz CRO strategies
- [FAQ](${site}/quizsignal/faq/): Theme blocks, AI credits, Klaviyo email capture, and GDPR compliance

## Comparisons
- [AI Search App Comparison](${site}/compare/): Side-by-side comparison of AI search and AEO optimization apps for Shopify

## Guides (AEO / GEO for Shopify merchants)
- [All guides](${site}/blog/): Answer Engine Optimization playbooks
${guideLines}

## Legal
- [Privacy Policy](${site}/privacy)
- [Quiz Signal Privacy Policy](${site}/quizsignal/privacy/)

## Optional
- [Agent skills index](${site}/.well-known/agent-skills/index.json): MCP/agent discovery
`;

await writeFile(outPath, body, "utf8");
console.log(`Wrote ${outPath} (${guides.length} guide links)`);
