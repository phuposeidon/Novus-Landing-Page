# Nexis CRO — weekly FLOW SEO checklist

> Framework (c) Daniel Agrici, [FLOW](https://github.com/AgriciDaniel/flow), CC BY 4.0.

Use this checklist each week until GSC impressions stabilize (typically 2–4 weeks after indexation).

## Site context

- **Product:** Nexis CRO — AI SEO & AEO Audit for Shopify
- **Domain:** https://nexiscro.com
- **Pillar:** `/blog/shopify-aeo-guide-2026/`
- **Install CTA:** https://apps.shopify.com/partners/nexis-cro

---

## Monday — FIND (demand)

- [ ] Run `/blog flow find shopify aeo` (or `skills/blog-flow/references/prompts/find/keyword-research-prompt.md`)
- [ ] Check GSC → Performance → Queries (even if low volume, note indexed pages)
- [ ] Pick **one** topic from content cluster gaps:
  - AI Rank Tracker setup
  - llms-full.txt vs llms.txt
  - Shopify FAQ schema for AI
  - Google AI Overviews for ecommerce
- [ ] Log topic + target keyword in issue or `docs/flow/content-queue.md`

**Prompt files:** `find/keyword-research-prompt.md`, `find/content-prioritization-prompt.md`

---

## Tuesday — WRITE (production)

- [ ] `/blog outline <topic>` or `/blog write <topic>`
- [ ] Follow `BRAND.md` + `VOICE.md` (Shopify merchant audience, no unsourced stats)
- [ ] Save draft: `src/content/blog/<slug>.md`
- [ ] Internal links: pillar guide + 2 related posts
- [ ] One contextual Nexis CRO mention (not hard sell)

---

## Wednesday — OPTIMIZE (extraction + trust)

- [ ] `/blog flow optimize https://nexiscro.com/blog/<slug>/`
- [ ] Apply 2–3 prompts from optimize stage (schema, CTR, technical)
- [ ] `python3 ~/.claude/scripts/analyze_blog.py src/content/blog/<slug>.md`
- [ ] `/blog seo-check` + `/blog geo` on draft
- [ ] FAQ block in frontmatter (3–5 questions) for FAQPage JSON-LD

**High-value optimize prompts for Nexis:**
- `schema-prompt-1.md`
- `blog-post-outline-prompt.md`
- `technical-audit-prompt.md`
- `dual-surface-content-scorecard.md` (win stage, run on publish day)

---

## Thursday — SHIP (indexation)

- [ ] `npm run build` (regenerates sitemap.xml + llms.txt)
- [ ] `npm run deploy`
- [ ] GSC → URL Inspection → Request indexing for new post
- [ ] GSC → Sitemaps → confirm `sitemap.xml` last read date
- [ ] Verify live: `/blog/<slug>/`, `/llms.txt`, `/blog/rss.xml`

---

## Friday — WIN (conversion + measure)

- [ ] `/blog flow win https://nexiscro.com/`
- [ ] Run `win/dual-surface-content-scorecard.md` on homepage + new post
- [ ] GA4: check `blog_index_view`, `blog_card_click`, `blog_article_view`
- [ ] App Store: note install velocity (ASO separate track)
- [ ] Update pillar "Related Guides" if new post fits cluster

---

## Monthly — LEVERAGE (off-site)

- [ ] `leverage/backlink-competition-prompt.md` — who ranks for our target queries?
- [ ] 1 community touchpoint: r/shopify, Shopify Community, or partner blog pitch
- [ ] Refresh `public/llms.txt` content map after 3+ new posts

---

## Content cluster status (update as you ship)

| Slug | Status |
|------|--------|
| shopify-aeo-guide-2026 | ✅ Pillar |
| llms-txt-shopify-stores | ✅ |
| shopify-json-ld-schema-ai-search | ✅ |
| track-chatgpt-citations-ecommerce | ✅ |
| ai-bot-manager-shopify-robots-txt | ✅ |
| shopify-competitor-citation-gaps | ✅ |
| ai-rank-tracker-shopify-setup | ✅ |
| llms-full-txt-shopify | 🔲 Planned |
