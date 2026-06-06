# Workflow: Audit-only (fast health check)

No writing. Surface technical + AI-search + marketing issues in ~15 min. Use before
a release, a board review, or when GSC traffic dips.

**Trigger:** `npm run seo:run -- audit-only`

## Steps
```
/seo audit https://nexiscro.com            # parallel agents → FULL-AUDIT-REPORT.md
/seo technical https://nexiscro.com        # 9-category technical pass
/seo geo https://nexiscro.com/blog/shopify-aeo-guide-2026   # AI-citability
/seo schema https://nexiscro.com           # JSON-LD validation
/market quick https://nexiscro.com         # 60-second marketing snapshot
```

## Optional (with credentials)
```
/seo google                                # GSC + PSI + CrUX (needs Tier 0–2 keys)
/seo drift compare history https://nexiscro.com   # regressions vs baseline
```

## Output
Reports land as markdown in the working dir. Triage into:
- **Critical** → fix before next deploy
- **High** → this week's queue (`docs/flow/content-queue.md`)
- **Monitor** → leading indicators to watch

Each finding carries a falsifiability check ("how would we know this failed?") —
keep it; it's how you verify the fix worked next audit.
