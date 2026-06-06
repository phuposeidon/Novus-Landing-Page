# Workflow: Content sprint (batch 3–5 posts)

Fill a cluster fast. Best when launching a new topic hub (e.g. all "AI Rank
Tracker" supporting posts around the pillar).

**Trigger:** `npm run seo:run -- content-sprint "<cluster>"`

## Steps

1. **Plan the cluster once**
   ```
   /seo cluster "<cluster keyword>"
   /blog flow find <cluster>
   ```
   Produces a hub-and-spoke map: 1 pillar + 3–5 spokes. Log all to
   `docs/flow/content-queue.md` with priority (P0/P1/P2).

2. **Draft each spoke** (repeat per topic)
   ```
   /blog write "<spoke title>"
   /blog seo-check src/content/blog/<slug>.md
   /blog geo src/content/blog/<slug>.md
   ```

3. **Wire internal links** — every spoke ↔ pillar, and spokes to each other where
   relevant. This is the cluster's ranking signal; don't skip it.

4. **Illustrate in batch**
   ```
   /banana batch "hero image for <cluster>, consistent style" 5
   ```

5. **Ship together**
   ```
   npm run build && npm run deploy
   ```
   Request indexing for all new URLs in GSC.

6. **Distribute as a series**
   ```
   /market social "<cluster>"      # one calendar covering the whole series
   ```

## Done criteria
- [ ] Pillar + all spokes live and interlinked
- [ ] Consistent hero style across the cluster
- [ ] All URLs in `sitemap.xml` + `llms.txt`
- [ ] Queue updated to "Shipped"
