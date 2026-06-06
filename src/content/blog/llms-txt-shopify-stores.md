---
title: "llms.txt for Shopify Stores: Setup Guide (2026)"
description: "How to publish llms.txt at your Shopify store root so ChatGPT, Perplexity, and Claude can discover your catalog, policies, and buying guides without wading through your full sitemap."
pubDate: 2026-06-07
updatedDate: 2026-06-07
author: "Nexis CRO Editorial Team"
tags:
  - llms.txt
  - Shopify
  - AEO
  - AI Search
heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80"
heroImageAlt: "Spreadsheet and analytics on screen representing curated catalog indexing for AI"
faq:
  - question: "Does Shopify support llms.txt natively?"
    answer: "No. Shopify does not let merchants upload arbitrary files to the domain root. You serve llms.txt via App Proxy, Cloudflare Worker, or a URL redirect from /llms.txt to a hosted file with correct text/plain headers."
  - question: "How long should llms.txt be for a Shopify store?"
    answer: "Keep the curated file under roughly 2,000 tokens (about 40 to 60 lines). Include 20 to 40 links to hero products, top collections, policy pages, and buying guides. Avoid dumping your entire catalog."
  - question: "What is the difference between llms.txt and llms-full.txt?"
    answer: "llms.txt is a hand-curated table of contents with links. llms-full.txt optionally bundles full markdown text of critical pages in one stream so models can read policies without fetching dozens of URLs."
  - question: "Will a 301 redirect to llms.txt work for AI crawlers?"
    answer: "GPTBot and ClaudeBot generally follow redirects to llms.txt. Perplexity sometimes behaves inconsistently on redirects. App Proxy or edge Workers that return HTTP 200 at /llms.txt are the most reliable options."
draft: false
---

<div class="key-takeaways">

**Key Takeaways**

- **llms.txt** is a curated markdown manifest at `yourstore.com/llms.txt` proposed by Jeremy Howard (Answer.AI, late 2024) and widely adopted by AI crawlers by 2026.
- Shopify **cannot host root files natively**; workable paths are App Proxy, Cloudflare Worker, or Files + URL redirect ([Craftshift](https://craftshift.com/llms-txt-shopify-complete-setup-guide/), [Surfient](https://www.surfient.com/guides/llms-txt-for-shopify)).
- A **25-link curated file** outperforms a 500-link auto-generated dump because LLMs have limited context windows.
- Pair llms.txt with [JSON-LD schema](/blog/shopify-json-ld-schema-ai-search/) and the broader [Shopify AEO guide](/blog/shopify-aeo-guide-2026/) for full AI discoverability.

</div>

## What Is llms.txt and Why Shopify Merchants Need It

llms.txt is a plain-text (markdown) file at your store root that tells AI systems which pages represent your brand accurately. Unlike `sitemap.xml`, which lists nearly every URL, llms.txt is **editorial**: you choose the collections, hero SKUs, sizing guides, and policy pages that answer pre-purchase questions.

For Shopify merchants, the file matters because LLMs increasingly answer shopping queries before a user clicks Google. If your return policy lives only on a buried `/policies/refund-policy` page and your bestseller is three clicks deep, models may cite a reseller or a competitor with clearer public context. llms.txt is the shortcut you hand to the model.

This is not a replacement for SEO or schema. It is the **curated map** layer in a three-part stack: crawler access, llms.txt, and [structured product data](/blog/shopify-json-ld-schema-ai-search/).

## llms.txt vs Sitemap vs robots.txt

| File | Purpose | Shopify default |
| --- | --- | --- |
| `robots.txt` | Allow or block crawlers | Platform-managed with theme overrides |
| `sitemap.xml` | Exhaustive URL index for search engines | Auto-generated |
| `llms.txt` | Curated highlights for LLM context | **Not included** |

Think of llms.txt as the executive summary you would email to a buyer researching your brand. The [llms.txt proposal](https://llmstxt.org/) uses an H1 title, optional blockquote summary, H2 sections, and markdown links with short descriptions.

## What to Include in a Shopify llms.txt

Curate **20 to 40 links**, not your full catalog. Recommended sections:

1. **Store summary** (blockquote): category, markets shipped, return window, brand positioning.
2. **Hero collections**: bestsellers, new arrivals, core category hubs.
3. **Top SKUs**: 5 to 15 products with high margin or strategic priority.
4. **Policies**: shipping, returns, warranty, sizing, sustainability.
5. **Buying guides**: blog posts or pages that answer "which product should I buy?"
6. **Optional** section: secondary links models can skip when context is tight.

**Exclude:** every variant URL, staging domains, cart/checkout paths, admin links, and auto-generated tag pages. A [Surfient analysis](https://www.surfient.com/guides/llms-txt-for-shopify) found that machine-generated 500-page files perform worse than a focused 25-page manifest.

### Example skeleton

```markdown
# Acme Outdoor — Shopify Store
> US shipping; 30-day returns; technical apparel for trail runners.

## Collections
- [Trail Running](https://example.com/collections/trail): Waterproof and breathable gear
- [Bestsellers](https://example.com/collections/bestsellers): Top-rated SKUs

## Policies
- [Shipping](https://example.com/policies/shipping-policy): 2-5 day domestic delivery
- [Returns](https://example.com/policies/refund-policy): Free 30-day returns

## Guides
- [Boot fit guide](https://example.com/blogs/news/boot-fit): Size and terrain matching
```

## How to Publish llms.txt on Shopify (3 Methods)

Shopify's closed hosting model means you cannot FTP a file to `/llms.txt`. These are the methods that work in production as of 2026.

### Method 1: App Proxy (recommended for Shopify apps)

An app proxy intercepts `yourstore.com/llms.txt` and returns markdown from your app server with `Content-Type: text/plain` and HTTP 200. No redirect, no HTML wrapper. This is how dedicated AEO apps (including [Nexis CRO llms.txt deployment](https://nexiscro.com/#features)) avoid theme conflicts.

**Verify:**

```bash
curl -I https://yourstore.com/llms.txt
```

Expect `HTTP/2 200` and `content-type: text/plain` (or `text/markdown`).

### Method 2: Cloudflare Worker

If your custom domain runs through Cloudflare, a short Worker can serve llms.txt at the edge and pass all other paths to Shopify. Zero redirect, no app dependency ([GEO Knowledge Base](https://aioforecommerce.com/shopify-llms-txt)).

### Method 3: Shopify Files + URL redirect

Upload `llms.txt` to **Settings → Files**, copy the CDN URL, then create a redirect in **Online Store → Navigation → URL Redirects** from `/llms.txt` to the file URL ([eCommerce Today](https://ecommerce-today.com/implementing-llms-txt-in-shopify-best-practices-for-seo-and-ai-indexing/)). Simple, but some crawlers prefer direct 200 responses over 301 chains.

**Avoid:** placing the file in `/assets/llms.txt` or rendering llms content inside a standard page template. Shopify may wrap content in HTML navigation, wasting crawler token budget ([aioforecommerce.com](https://aioforecommerce.com/shopify-llms-txt)).

## llms-full.txt: When to Add a Second File

Some merchants publish **`llms-full.txt`** alongside the curated index. The full file inlines markdown text from critical policies and guides so models can read shipping and return rules without fetching multiple URLs. Keep the curated `llms.txt` small; put bulk content in `llms-full.txt` only if you can maintain freshness monthly.

## Five Mistakes That Waste Your llms.txt Effort

1. **Auto-dumping the sitemap** into llms.txt. Defeats the purpose of curation.
2. **Wrong content-type** (`text/html` instead of plain text). Validate with `curl -I`.
3. **Broken or redirected links** in the curated list. Audit URLs quarterly.
4. **Stale product references** after discontinuations. Treat llms.txt like a campaign landing page.
5. **Blocking AI bots** in robots.txt while publishing llms.txt. Crawlers must be allowed to fetch the file.

## Maintenance Cadence

| Frequency | Task |
| --- | --- |
| Weekly | Check hero SKU links after launches |
| Monthly | Refresh policy links and bestseller section |
| Quarterly | Full URL validation and competitor citation review |

After publishing, track whether AI referrals rise in analytics and run [ChatGPT citation checks](/blog/track-chatgpt-citations-ecommerce/) on category prompts you care about.

<div class="cta-box">
<p class="cta-title">Auto-generate and deploy llms.txt on Shopify</p>
<p class="cta-desc">Nexis CRO generates, deploys, and refreshes your store's llms.txt via app proxy with no theme surgery.</p>
<a class="cta-btn" href="https://apps.shopify.com/partners/nexis-cro" target="_blank" rel="noopener noreferrer">Start Free Audit</a>
</div>

## FAQ

<dl class="faq">

<dt>Does Shopify support llms.txt natively?</dt>
<dd>No. Use App Proxy, Cloudflare Worker, or Files plus URL redirect to serve the file at /llms.txt with text/plain headers.</dd>

<dt>How long should llms.txt be?</dt>
<dd>Target under 2,000 tokens: roughly 40 to 60 lines with 20 to 40 curated links.</dd>

<dt>What is llms-full.txt?</dt>
<dd>An optional companion file that inlines full markdown from critical pages so models can read policies without multiple fetches.</dd>

<dt>Do redirects work for AI crawlers?</dt>
<dd>Often yes for GPTBot and ClaudeBot, but App Proxy or edge Workers returning HTTP 200 are more reliable than 301 chains.</dd>

</dl>
