# Content queue — FLOW FIND output

> Trial run: 2026-06-06. Framework (c) Daniel Agrici, [FLOW](https://github.com/AgriciDaniel/flow), CC BY 4.0.

## Executive summary

Nexis CRO has a solid **6-post AEO cluster** covering crawl policy, llms.txt, schema, citation tracking, and competitor gaps. The biggest **content gap** is the product differentiator readers cannot get elsewhere: **AI Rank Tracker setup** (how to track prompts, schedule checks, read SOV). Second priority: **llms-full.txt** (deeper spec than the existing llms.txt guide).

**Recommended next post:** `ai-rank-tracker-shopify-setup` — bridges pillar Layer 4 to the competitor-citation post and drives app installs.

## Priority table

| Priority | Topic | Target keyword (assumption) | Intent | Why now |
|----------|-------|----------------------------|--------|---------|
| **P1** | AI Rank Tracker setup for Shopify | `shopify ai rank tracker`, `track chatgpt rankings shopify` | Commercial investigation | Only Nexis-native workflow; closes cluster loop |
| **P2** | llms-full.txt vs llms.txt | `llms-full.txt shopify`, `llms.txt specification` | Informational | Extends existing llms.txt post; AI-agent surface |
| **P3** | Google AI Overviews for Shopify | `google ai overviews shopify`, `shopify aeo google` | Informational | Dual-surface (Google + LLM); high merchant anxiety |
| P4 | Shopify FAQ schema for AI citations | `shopify faq schema json-ld` | Informational | Overlaps schema post — defer unless cannibalization check passes |

## Cluster coverage map

| Layer (pillar) | Post | Status |
|--------------|------|--------|
| Crawler policy | ai-bot-manager-shopify-robots-txt | ✅ |
| llms.txt | llms-txt-shopify-stores | ✅ |
| Schema | shopify-json-ld-schema-ai-search | ✅ |
| Citation measurement | track-chatgpt-citations-ecommerce | ✅ |
| Competitor SOV | shopify-competitor-citation-gaps | ✅ |
| **Rank Tracker (product)** | ai-rank-tracker-shopify-setup | ✅ Shipped 2026-06-13 |
| llms-full.txt depth | llms-full-txt-shopify | 🔲 |

## Gaps blocking trust / extraction / conversion

1. **Product proof gap:** Blog explains *what* to track but not *how inside Nexis CRO* (screens, steps, free-plan limits).
2. **Indexation gap (observed):** GSC/GA4 show zero impressions — site is young; need 1 post/week + GSC request indexing after each deploy.
3. **Internal link gap:** Pillar mentions Rank Tracker in stack but no dedicated deep link target yet.

## P1 brief — AI Rank Tracker setup

**Title (draft):** Shopify AI Rank Tracker Setup: Track ChatGPT Citations (2026)

**Slug:** `ai-rank-tracker-shopify-setup`

**Searcher intent:** Merchant already believes AI citations matter; wants a repeatable weekly workflow with tool steps.

**Outline (H2s):**
1. What an AI Rank Tracker measures (prompts, models, SOV)
2. Pick your first 10 prompts (commercial + comparison + brand)
3. Configure brand + competitor aliases in Nexis CRO
4. Run manual check vs scheduled checks (plan gates)
5. Read results: cited, mentioned, competitor wins
6. 30-day iteration loop (link to competitor-citation-gaps post)

**Internal links:** pillar, track-chatgpt-citations, shopify-competitor-citation-gaps

**CTA:** Free plan install — no credit card

**Claims to verify before publish:**
- Nexis plan limits for tracked prompts (FREE/PRO/GROWTH/AGENCY)
- Which models Rank Tracker checks (ChatGPT, Gemini, Perplexity)
- Shopify Q1 2026 AI referral stats (already cited in pillar — reuse same source)

## Measurement plan

| Event | Tool | Cadence |
|-------|------|---------|
| Indexation | GSC URL Inspection | After each deploy |
| Impressions/clicks | GSC Performance | Weekly |
| Blog engagement | GA4 `blog_article_view`, `blog_card_click` | Weekly |
| Install attribution | App Store analytics | Monthly |

## Next FLOW stage

**Tuesday WRITE:** `/blog write ai rank tracker shopify setup`

**Wednesday OPTIMIZE:** `/blog flow optimize https://nexiscro.com/blog/ai-rank-tracker-shopify-setup/` (after draft exists)
