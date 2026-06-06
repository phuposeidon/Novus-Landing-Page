# Marketing Audit — nexiscro.com

**URL:** https://nexiscro.com  
**Initial audit:** June 6, 2026  
**Last updated:** June 6, 2026 (post-implementation review)  
**Business type:** SaaS — Shopify app (AEO / AI SEO auditing)  
**Method:** AI Marketing Suite (`/market`) + `analyze_page.py` + source review

---

## Executive summary

| Metric | Value |
|--------|-------|
| **Marketing health score** | **64 / 100** (C+) |
| **Primary drag** | Brand & trust — **42/100** (no social proof on homepage) |
| **Primary strength** | Content & messaging — **72/100** (hero + blog moat) |
| **Projected after P0 fixes** | **~72–75 / 100** (trust microcopy + product demo CTA shipped) |
| **Ceiling without reviews** | ~75 — real App Store ratings/testimonials needed for 80+ |

**Verdict:** Product positioning and technical SEO foundation are strong. Conversion is limited by missing trust signals (reviews, install count, testimonials), not by copy quality. The highest-leverage remaining work is **real social proof** — not more schema or H2 tweaks.

---

## Live verification snapshot (June 6, 2026)

Re-run anytime:

```bash
python3 ~/.claude/skills/market/scripts/analyze_page.py https://nexiscro.com
curl -sI https://www.nexiscro.com/ | grep -Ei '^HTTP|^location'
```

| Check | Status | Evidence |
|-------|--------|----------|
| JSON-LD on homepage | ✅ | `SoftwareApplication`, `Organization`, `WebSite`, `FAQPage` |
| Blog `BlogPosting` + `BreadcrumbList` | ✅ | All 7 posts via `BlogLayout.astro` |
| Canonical tags | ✅ | `Layout.astro` — every page |
| `og-image.png` 1200×630 | ✅ | + `og:image:width/height/type` |
| www → apex 301 | ✅ | `location: https://nexiscro.com/` |
| Sitemap (no priority/changefreq) | ✅ | `scripts/generate-sitemap.mjs` |
| AI bots in robots.txt | ✅ | GPTBot, ClaudeBot, PerplexityBot, etc. |
| Author page `/about/` | ✅ | Organization editorial schema |
| Analyzer SEO sub-score | **10/10** | title 42ch, meta 150ch, schema detected |
| Analyzer trust sub-score | **6/10** | no social links / proof block |

---

## Score breakdown

| Category | Weight | Score | Weighted | Grade |
|----------|--------|-------|----------|-------|
| Content & Messaging | 25% | 72 | 18.0 | B |
| Conversion Optimization | 20% | 52 | 10.4 | D+ |
| SEO & Discoverability | 20% | 75 | 15.0 | B+ |
| Competitive Positioning | 15% | 62 | 9.3 | C+ |
| Brand & Trust | 10% | 42 | 4.2 | F |
| Growth & Strategy | 10% | 67 | 6.7 | C+ |
| **Total** | | | **63.6 → 64** | **C+** |

---

## Implemented since initial audit

| # | Recommendation | Status | Where |
|---|----------------|--------|-------|
| 1 | Hero trust microcopy | ✅ Shipped | `Hero.astro` — "Free forever plan · No credit card · 2-min Shopify install" |
| 2 | Hero subheadline clarity | ✅ Shipped | "in one click. No code, no guesswork." |
| 3 | Secondary CTA → product demo | ✅ Shipped | "See the Product" → `/#demo` |
| 4 | Outcome stat on homepage | ✅ Shipped | `Problem.astro` — Shopify Q1 2026 13× orders stat |
| 5 | Annual pricing default | ✅ Shipped | `Pricing.astro` — annual tab active on load |
| 6 | Keyword-rich H2s | ✅ Shipped | Features, Demo, Pricing, Blog preview, footer |
| 7 | SEO/schema/OG/sitemap fixes | ✅ Shipped | See `docs/seo-suite.md` commit history |
| 8 | Editorial author + `/about/` | ✅ Shipped | Organization author (not Person team name) |
| 9 | App Store rating in hero | ⏳ Blocked | Needs real review count — do not fabricate |
| 10 | Testimonials section | ⏳ Blocked | Needs 2+ named merchant quotes |
| 11 | `/compare` page | 📋 Planned | Comparison-intent traffic |
| 12 | Agency landing section | 📋 Planned | Highest LTV segment |

---

## PERCEIVE — What the market sees

The hero works. *"Your store is invisible to AI search engines."* is fear-based, ICP-specific, and stops the right Shopify merchant mid-scroll. Platform naming (ChatGPT, Perplexity, Google AI, Bing Copilot) signals category expertise.

**After P0 fixes:** Visitors now see trust microcopy, a demo CTA that lands on `#demo`, and a sourced market-timing stat (13× AI-referred orders). The funnel is less backwards — but still lacks third-party validation (stars, installs, quotes).

**Falsifiability check:** If hero CTR doesn't lift within 14 days, the bottleneck is trust proof, not copy. Measure `install_click` with `location=hero` in GA4.

---

## 1. Content & Messaging — 72/100

### Strengths

- Pain-first headline with clear ICP
- Platform-specific subheadline (not generic "AI search")
- FAQ resolves 7 real objections including permanent-free reframe
- 7 blog posts in week one — category authority if velocity holds

### Gaps (remaining)

| Gap | Fix | Falsifiability |
|-----|-----|----------------|
| No outcome copy above fold (was) | Stat block added in Problem | Compare bounce rate on `/#how-it-works` vs prior |
| "One-click AI" vague (was) | Hero subheadline rewritten | A/B `hero_sub` variant in 30 days |
| Hero subheadline long on mobile | Test trimmed 1-line variant | Mobile scroll depth to `#demo` |

### Copy reference (current live)

```
H1: Your store is invisible to AI search engines.
Sub: ...fixes what's broken in one click. No code, no guesswork.
Trust: Free forever plan · No credit card · 2-min Shopify install
CTA: [Start Free Audit] [See the Product → #demo]
```

---

## 2. Conversion Optimization — 52/100 → ~58 projected

### Core problem: zero social proof

Still missing on homepage:

- App Store star rating / review count
- Install / merchant count
- Named testimonials
- Shopify Partner badge visible
- Case study outcomes

**Do not add fabricated `aggregateRating`** — removed from schema for policy compliance. Wire only when Partner Dashboard shows real numbers.

### CTA map (updated)

| CTA | Location | Target | Status |
|-----|----------|--------|--------|
| Start Free Audit | Hero | App Store | ✅ |
| See the Product | Hero | `/#demo` | ✅ Fixed |
| Install Free / Choose * | Pricing | App Store | ✅ |
| Send Message | Contact | Form | ✅ |

### Remaining conversion work

| Element | Priority | Blocker |
|---------|----------|---------|
| Social proof block under hero | Critical | Real App Store metrics |
| Testimonial section | High | Named merchant permission |
| Video walkthrough | High | Asset production |
| Shopify Partner badge | Medium | Partner asset export |

---

## 3. SEO & Discoverability — 75/100

Cross-reference: technical SEO work in repo (`docs/seo-suite.md`, commits `6bb3d91`, `a2bfbb8`).

### Strengths

- Blog targets high-intent AEO queries
- Schema stack: `SoftwareApplication`, `Organization`, `WebSite`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `CollectionPage`
- `robots.txt` allows AI crawlers explicitly
- `llms.txt` + RSS + sitemap with `lastmod`

### Gaps

| Gap | Impact | Next step |
|-----|--------|-----------|
| No `/compare` or `/alternatives` page | Comparison-intent traffic | `/seo competitor-pages` + `/blog write` |
| Blog heroes on Unsplash CDN | No image sitemap control | Self-host when scaling |
| `sameAs` only App Store | Entity graph thin | Add social when profiles exist |

---

## 4. Competitive Positioning — 62/100

**Moat:** "AEO for Shopify" is uncrowded. Niche + App Store distribution beats generic SEO tools on relevance.

**Gap:** No comparison pages for "Nexis vs Semrush" or "best AEO Shopify app" queries.

**Recommended page angles:**

1. vs traditional SEO tools — "They audit Google; we audit ChatGPT citations"
2. vs manual checklists — "Hours of spreadsheet work → 60-second audit"
3. vs doing nothing — market timing (13× stat)

Use workflow: `npm run seo:run -- content-sprint "shopify aeo alternatives"`

---

## 5. Brand & Trust — 42/100

| Signal | Present | Notes |
|--------|---------|-------|
| Trust microcopy under CTA | ✅ | Shipped |
| App Store rating | ❌ | Waiting on reviews |
| Install count | ❌ | Pull from Partner Dashboard |
| Testimonials | ❌ | Need merchants |
| Founder name on homepage | ❌ | `/about/` exists; add founder when ready |
| Privacy reassurance | Partial | Footer link only |
| Shopify Partner badge | ❌ | Not visible |

**Minimum viable trust stack (ordered):**

1. ✅ Trust microcopy — done
2. ⏳ App Store rating — when ≥5 reviews
3. ⏳ One real testimonial — name + store + metric
4. ⏳ Founder `Person` schema — real name + LinkedIn

---

## 6. Growth & Strategy — 67/100

### Strengths

- Permanently free plan = correct PLG loop
- Credit packs reduce upgrade pressure
- Agency plan = B2B2C channel ($149/mo × 5 stores)

### Gaps

- No visible referral program
- Annual billing now default ✅ — monitor `billing_toggle` GA4 events for monthly override rate
- No published case studies

---

## Priority action plan

### Done (this session)

- [x] Hero trust microcopy
- [x] Hero subheadline + demo CTA
- [x] Problem stat block (Shopify Q1 2026)
- [x] Annual pricing default
- [x] SEO/schema/OG/sitemap/author fixes

### This week — blocked on real data

| # | Task | Owner | Unblocks when |
|---|------|-------|---------------|
| 1 | Add App Store rating + install count to hero | You | Partner Dashboard has numbers |
| 2 | Collect 2 merchant testimonials | You | Outreach / beta users |
| 3 | Add Shopify Partner badge to footer | Dev | Export badge asset |

### This month — content & positioning

| # | Task | Tool / workflow |
|---|------|-----------------|
| 4 | `/compare` or alternatives hub page | `/seo competitor-pages` + `/blog write` |
| 5 | Agency value-prop section | `/market copy https://nexiscro.com` |
| 6 | First case study post | `/blog write` + merchant data |
| 7 | Product Hunt prep | `/market launch "Nexis CRO"` |

### 90-day — growth infrastructure

| # | Initiative |
|---|------------|
| 8 | In-app review collection campaign |
| 9 | Quarterly AEO benchmark report (link bait) |
| 10 | Referral program (credit rewards) |

---

## Revenue impact estimate (honest ranges)

| Fix | Effort | Lift | Status |
|-----|--------|------|--------|
| Trust microcopy | 30 min | +5–15% hero CTR | ✅ Done |
| Demo CTA target fix | 15 min | −10% confused bounces | ✅ Done |
| Outcome stat block | 30 min | +engagement on Problem | ✅ Done |
| Annual default | 30 min | +20–30% annual mix | ✅ Done — measure in GA4 |
| App Store rating in hero | 1 hr | +10–15% install rate | ⏳ Pending data |
| Testimonials | 4 hrs | +15–25% upgrade rate | ⏳ Pending quotes |
| Compare page | 8 hrs | +15–30% comparison traffic | 📋 Planned |

---

## How to re-run this audit

```bash
# Install / verify marketing tool in seo-suite
npm run seo:doctor

# Headless page analyzer (no API key)
python3 ~/.claude/skills/market/scripts/analyze_page.py https://nexiscro.com

# Full agentic audit inside Claude Code
claude
/market audit https://nexiscro.com
/market quick https://nexiscro.com

# Weekly loop (includes distribute + measure)
npm run seo:run -- weekly-loop
```

Save output to `seo-suite/MARKETING-AUDIT.md` and update the **Implemented since** table.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-06 | Initial audit — score 64/100 |
| 2026-06-06 | Review pass: verification snapshot, implemented table, corrected SEO notes, P0 hero/pricing/problem shipped |

---

*Generated by AI Marketing Suite (`/market audit`). Maintained as living doc in `seo-suite/`.*
