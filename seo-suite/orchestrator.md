# SEO Suite Orchestrator — Nexis CRO

The single entry point that turns five Claude Code skill packs into **one
multi-platform SEO growth pipeline**. Open this file in a Claude Code session
(`claude` from the repo root) and drive any stage with the slash commands below.

> **Tools wired in:** `/seo` (Claude SEO) · `/blog` (Claude Blog) · `/blog flow`
> (FLOW framework) · `/banana` (image generation) · `/market` (AI Marketing Suite).
> Install + verify with `npm run seo:install && npm run seo:doctor`.

## The pipeline

```
DISCOVER → CREATE → ILLUSTRATE → OPTIMIZE → DISTRIBUTE → MEASURE
   │          │         │            │           │           │
  /seo       /blog    /banana       /seo       /market      /seo google
  /market    /market               /blog       /blog        /blog flow win
  /blog flow                       seo-check   repurpose
```

Each stage names the **primary tool**, the **command**, and the **artifact** it
produces. Stages are independent — run the whole loop weekly, or jump to a single
stage on demand.

### 1. DISCOVER — find demand, gaps, and technical debt
| Goal | Command | Output |
|------|---------|--------|
| Full site audit (parallel agents) | `/seo audit https://nexiscro.com` | `FULL-AUDIT-REPORT.md` |
| AI-search readiness | `/seo geo https://nexiscro.com/blog/<post>` | `GEO-ANALYSIS.md` |
| Keyword clusters | `/seo cluster "shopify aeo"` | cluster map |
| Demand + intent mapping | `/blog flow find shopify aeo` | topic queue |
| Competitor marketing gaps | `/market competitors https://<competitor>` | gap report |

**Nexis default:** start each week with `/seo audit` + `/blog flow find`, then
reconcile against `docs/flow/content-queue.md`.

### 2. CREATE — write the asset
| Goal | Command | Output |
|------|---------|--------|
| New blog post | `/blog write "<target keyword>"` | `src/content/blog/<slug>.md` |
| Outline first | `/blog outline "<topic>"` | outline |
| Landing/section copy | `/market copy https://nexiscro.com` | before/after copy |
| Email sequence | `/market emails "<topic>"` | sequence |

**Always** pass `BRAND.md` + `VOICE.md` so voice stays consistent. Save posts to
`src/content/blog/` (Astro content collection).

### 3. ILLUSTRATE — generate visuals
| Goal | Command | Output |
|------|---------|--------|
| Blog hero | `/banana generate "hero image for <post topic>"` | PNG |
| OG / social card | `/banana generate "OG card: <title>"` (1200×630) | PNG |
| Infographic | `/banana generate "infographic: <data>"` | PNG |

Needs `GOOGLE_AI_API_KEY`. Save to `public/` and reference from frontmatter.

### 4. OPTIMIZE — make it rank + get cited
| Goal | Command | Output |
|------|---------|--------|
| On-page SEO validation | `/blog seo-check src/content/blog/<slug>.md` | checklist |
| AI extraction formatting | `/blog geo src/content/blog/<slug>.md` | citability fixes |
| Page-level SEO | `/seo page https://nexiscro.com/blog/<slug>` | findings |
| Schema audit/generate | `/seo schema https://nexiscro.com/blog/<slug>` | JSON-LD |
| FLOW optimize prompts | `/blog flow optimize https://nexiscro.com/blog/` | 2–3 fixes |

Then ship: `npm run build && npm run deploy`, request indexing in GSC.

### 5. DISTRIBUTE — multi-platform reach
| Goal | Command | Output |
|------|---------|--------|
| Repurpose to social/email | `/blog repurpose src/content/blog/<slug>.md` | threads, posts |
| 30-day social calendar | `/market social "<topic>"` | calendar |
| Ad creative | `/market ads https://nexiscro.com` | ad copy |
| Backlink/citation gaps | `/seo backlinks https://nexiscro.com` | link targets |

Targets for Nexis: Shopify App Store, r/shopify, partner blogs, LinkedIn, X.

### 6. MEASURE — close the loop
| Goal | Command | Output |
|------|---------|--------|
| GSC / GA4 / PSI pull | `/seo google` | performance |
| Drift vs last baseline | `/seo drift compare history https://nexiscro.com` | regressions |
| Conversion scorecard | `/blog flow win https://nexiscro.com/` | BOFU score |
| Funnel analysis | `/market funnel https://nexiscro.com` | funnel report |

Verify GA4 `blog_article_view` / `blog_card_click` / `blog_index_view` events fire.

## How tools hand off
- **Claude SEO → Claude Blog:** audit/geo findings become the brief for `/blog write`.
- **Claude Blog → Banana:** the draft topic seeds `/banana generate` hero + OG.
- **FLOW → everything:** the evidence-led prompts frame DISCOVER and MEASURE.
- **AI Marketing → DISTRIBUTE:** post-publish, drive social/email/ad reach.
- **Claude SEO `seo-image-gen` extension** wraps Banana, so SEO assets stay in one flow.

## Run it as a workflow
See `seo-suite/workflows/` for copy-paste runbooks:
- `full-pipeline.md` — one topic end-to-end (all 6 stages)
- `weekly-loop.md` — the Mon→Fri cadence
- `audit-only.md` — fast health check, no writing
- `content-sprint.md` — batch 3–5 posts
- `distribute.md` — repurpose an existing post across platforms
