# Workflow: Distribute (repurpose an existing post)

Squeeze multi-platform reach out of a post that's already live. No new long-form
writing. ~20 min.

**Trigger:** `npm run seo:run -- distribute "src/content/blog/<slug>.md"`

## Steps

1. **Repurpose the core asset**
   ```
   /blog repurpose src/content/blog/<slug>.md
   ```
   Generates: X/Twitter thread, LinkedIn post, Reddit discussion draft, email
   excerpt, YouTube short script.

2. **Build a posting calendar**
   ```
   /market social "<post topic>"
   ```
   30-day calendar with platform-specific framing.

3. **Paid amplification (optional)**
   ```
   /market ads https://nexiscro.com/blog/<slug>
   ```

4. **Earn citations / backlinks**
   ```
   /seo backlinks https://nexiscro.com
   ```
   Identify link + AI-citation targets (Shopify App Store, r/shopify, partner blogs,
   LinkedIn, YouTube). Prioritize the platforms AI engines cite most.

## Platform map for Nexis
| Platform | Asset | Why |
|----------|-------|-----|
| Shopify App Store | listing/update note | buyer intent + AI training source |
| r/shopify, r/ecommerce | discussion post | high AI-citation weight |
| LinkedIn | thought-leadership post | B2B reach |
| X/Twitter | thread | velocity + backlinks |
| YouTube | short from `/blog repurpose` script | entity presence for GEO |

## Done criteria
- [ ] Posted to ≥3 platforms
- [ ] Tracking links / UTM where applicable
- [ ] Citation targets logged for follow-up
