# SEO Suite — multi-platform growth automation

Nexis CRO's SEO, content, and marketing automation is packaged as the
**[SEO Suite](../seo-suite/README.md)**: five Claude Code skill packs wired into
one triggerable pipeline.

## TL;DR

```bash
npm run seo:install     # install the 5 skill packs into ~/.claude
npm run seo:doctor      # verify
npm run seo:run -- weekly-loop          # print the weekly runbook
npm run seo:run -- full-pipeline "kw"   # one topic end-to-end
npm run seo:test        # offline self-tests
```

## What's in it

| Tool | Command | Stage |
|------|---------|-------|
| Claude SEO | `/seo` | discover · optimize · measure |
| Claude Blog | `/blog` | create · optimize · distribute |
| FLOW | `/blog flow` | discover · distribute · measure |
| Banana | `/banana` | illustrate |
| AI Marketing Suite | `/market` | discover · create · distribute · measure |

Pipeline: **DISCOVER → CREATE → ILLUSTRATE → OPTIMIZE → DISTRIBUTE → MEASURE**

## Documentation map

- **[seo-suite/README.md](../seo-suite/README.md)** — package overview + layout
- **[seo-suite/orchestrator.md](../seo-suite/orchestrator.md)** — stage → command map
- **[seo-suite/workflows/](../seo-suite/workflows/)** — runbooks (full-pipeline, weekly-loop, audit-only, content-sprint, distribute)
- **[seo-suite/docs/SETUP.md](../seo-suite/docs/SETUP.md)** — install + per-tool setup
- **[seo-suite/docs/API-KEYS.md](../seo-suite/docs/API-KEYS.md)** — credentials matrix
- **[seo-suite/docs/TROUBLESHOOTING.md](../seo-suite/docs/TROUBLESHOOTING.md)** — fixes
- **[flow-seo.md](./flow-seo.md)** — the FLOW framework integration (one of the 5 tools)
- **[flow/nexis-weekly-checklist.md](./flow/nexis-weekly-checklist.md)** — the weekly loop in detail
- **[flow/content-queue.md](./flow/content-queue.md)** — content backlog

## Automation

`.github/workflows/seo-suite.yml`:
- **Manual dispatch** — pick a workflow, get its runbook in the job log.
- **Weekly (Mon 06:00 UTC)** — opens a tracking issue for the weekly loop and
  validates the suite.
- **CI on push/PR** — runs `seo:test` + a dry-run install.

The suite is **not** a black-box autopilot: the slash-command stages run inside an
interactive Claude Code session (they reason, fetch, and write files). The
automation layer schedules, prints runbooks, validates the package, and tracks the
cadence — you (or an agent) drive the creative stages.
