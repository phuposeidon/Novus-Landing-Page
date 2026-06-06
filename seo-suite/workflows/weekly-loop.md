# Workflow: Weekly loop (Mon → Fri cadence)

The repeatable rhythm that compounds organic + AI-search traffic. One post per
week, fully optimized and distributed. Pairs with `docs/flow/nexis-weekly-checklist.md`.

**Trigger:** scheduled GitHub Action (`.github/workflows/seo-suite.yml`, Mondays)
opens a tracking issue; the human/agent then runs the stages below.

| Day | Stage | Commands |
|-----|-------|----------|
| **Mon** | DISCOVER | `/seo audit https://nexiscro.com` · `/blog flow find <cluster>` → pick 1 topic |
| **Tue** | CREATE | `/blog outline` → `/blog write` (BRAND.md + VOICE.md) → save to `src/content/blog/` |
| **Wed** | ILLUSTRATE + OPTIMIZE | `/banana generate` hero+OG · `/blog seo-check` · `/blog geo` · `/seo schema` |
| **Thu** | SHIP | `npm run build && npm run deploy` · GSC request indexing |
| **Fri** | DISTRIBUTE + MEASURE | `/blog repurpose` · `/market social` · `/seo google` · `/blog flow win` |

## Monthly (first Monday)
- `/seo drift baseline https://nexiscro.com` then `compare` weekly after.
- `/market audit https://nexiscro.com` — full marketing scorecard.
- `/seo backlinks https://nexiscro.com` — refresh link/citation targets.
- `npm run flow:sync` — pull latest FLOW prompts (or let the weekly Action do it).

## Guardrails
- Never publish without `/blog seo-check` passing.
- Every post links to and from the pillar.
- Keep `docs/flow/content-queue.md` as the single backlog.
