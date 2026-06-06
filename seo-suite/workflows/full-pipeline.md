# Workflow: Full pipeline (one topic, end-to-end)

Take a single target keyword from idea to published, illustrated, optimized, and
distributed. ~60–90 min of agent time. Run inside `claude` from the repo root.

**Trigger:** `npm run seo:run -- full-pipeline "<keyword>"` (prints this runbook),
or follow the steps manually.

## Inputs
- `KEYWORD` — target keyword/topic (e.g. "shopify llms.txt")
- `BRAND.md` + `VOICE.md` present in repo root

## Steps

1. **DISCOVER**
   ```
   /seo cluster "<KEYWORD>"
   /blog flow find <KEYWORD>
   ```
   Pick the exact title + primary/secondary keywords. Confirm it isn't already in
   `docs/flow/content-queue.md`.

2. **CREATE**
   ```
   /blog outline "<title>"
   /blog write "<title>"
   ```
   Save to `src/content/blog/<slug>.md`. Fill frontmatter (title, description,
   pubDate, faq, heroImage).

3. **ILLUSTRATE** (needs `GOOGLE_AI_API_KEY`)
   ```
   /banana generate "hero image for <title>, Shopify SaaS, clean editorial"
   /banana generate "OG card 1200x630: <title>"
   ```
   Save to `public/blog/<slug>/`, reference `heroImage` in frontmatter.

4. **OPTIMIZE**
   ```
   /blog seo-check src/content/blog/<slug>.md
   /blog geo src/content/blog/<slug>.md
   /seo schema https://nexiscro.com/blog/<slug>
   ```
   Apply fixes. Add internal links to/from the pillar (`shopify-aeo-guide-2026`).

5. **SHIP**
   ```
   npm run build && npm run deploy
   ```
   Then in GSC: URL Inspection → Request Indexing.

6. **DISTRIBUTE**
   ```
   /blog repurpose src/content/blog/<slug>.md
   /market social "<title>"
   ```
   Post to Shopify App Store update, r/shopify, LinkedIn, X.

7. **MEASURE** (48h+ later)
   ```
   /seo page https://nexiscro.com/blog/<slug>
   /seo google
   ```
   Log impressions/clicks. Update `docs/flow/content-queue.md` status.

## Done criteria
- [ ] Post live (HTTP 200) and in `sitemap.xml` + `llms.txt`
- [ ] Hero + OG image set
- [ ] `/blog seo-check` and `/blog geo` clean
- [ ] Internal links wired both directions
- [ ] Distributed to ≥2 platforms
- [ ] Queue + checklist updated
