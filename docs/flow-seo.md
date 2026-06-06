# FLOW SEO automation — Nexis CRO

Evidence-led SEO workflow using [FLOW](https://github.com/AgriciDaniel/flow) (Find · Leverage · Optimize · Win) integrated with [claude-blog](https://github.com/AgriciDaniel/claude-blog).

**Attribution:** Framework and prompts (c) Daniel Agrici, CC BY 4.0. Source: github.com/AgriciDaniel/flow

## Installed in this repo

| Path | Purpose |
|------|---------|
| `skills/blog-flow/SKILL.md` | Cursor skill — `/blog flow` commands |
| `skills/blog-flow/references/` | 30 blog prompts + framework docs (synced from FLOW) |
| `scripts/sync-flow.py` | Pull latest prompts from github.com/AgriciDaniel/flow |
| `scripts/install-cursor-skills.mjs` | Copy `skills/` → `.cursor/skills/` (local only) |
| `docs/flow/nexis-weekly-checklist.md` | Nexis-specific weekly SEO loop |
| `.github/workflows/flow-sync.yml` | Weekly GitHub Action to refresh FLOW prompts |

## Quick setup

```bash
# 1. Sync latest FLOW prompts (needs network; GITHUB_TOKEN if rate-limited)
npm run flow:sync

# 2. Enable in Cursor (gitignored copy)
npm run flow:install
```

## Nexis CRO playbook mapping

Nexis is a **SaaS + ecommerce-adjacent** Shopify app. Use FLOW stages like this:

| FLOW stage | Nexis focus | Prompts / commands |
|------------|-------------|-------------------|
| **Find** | Keyword clusters: Shopify AEO, llms.txt, JSON-LD, AI citations | `/blog flow find shopify aeo` |
| **Leverage** | App Store reviews, Reddit r/shopify, partner mentions | `/blog flow prompts` → backlink-competition |
| **Optimize** | Blog posts, homepage, schema, llms.txt, technical crawl | `/blog flow optimize https://nexiscro.com/blog/` |
| **Win** | Install CTA, pricing page, dual-surface scorecard | `/blog flow win https://nexiscro.com/` |

Full SaaS playbook: [flow/docs/08-playbooks/saas.md](https://github.com/AgriciDaniel/flow/blob/main/docs/08-playbooks/saas.md)

## Weekly automation loop

See `docs/flow/nexis-weekly-checklist.md`. Summary:

1. **Monday — Find:** Run keyword-research + content-prioritization prompts; pick 1 blog topic.
2. **Tuesday — Write:** `/blog write` using `BRAND.md` + `VOICE.md`; save to `src/content/blog/`.
3. **Wednesday — Optimize:** `/blog flow optimize` on draft URL; run `analyze_blog.py`.
4. **Thursday — Ship:** `npm run build && npm run deploy`; GSC request indexing.
5. **Friday — Win:** Dual-surface scorecard on homepage + pillar post; check GA4 `blog_*` events.

## Cursor commands

```
/blog flow              # Stage menu (Find / Optimize / Win)
/blog flow find <topic> # Demand + intent mapping (5 prompts)
/blog flow optimize <url># Pick 2–3 relevant optimize prompts
/blog flow win <url>    # BOFU + conversion scorecard
/blog flow sync         # npm run flow:sync
/blog write <topic>     # Draft post (claude-blog)
/blog seo-check <file>  # On-page validation
/blog geo <file>        # AI extraction formatting
```

## CI

- **flow-sync.yml** — Mondays 06:00 UTC: sync FLOW prompts, open PR if lockfile changes.
- **seo-build.yml** — On push/PR: verify sitemap + llms.txt generation and Astro build.

## Updating FLOW prompts

```bash
npm run flow:sync              # fetch latest from GitHub
npm run flow:install           # refresh .cursor/skills/
git add skills/blog-flow/references/
git commit -m "chore: sync FLOW prompts"
```

If lockfile drift blocks sync:

```bash
python3 scripts/sync-flow.py --allow-drift
```
