# Nexis SEO Suite

A single, triggerable **SEO + content + marketing automation pipeline** built on
five open-source Claude Code skill packs. One install, one health check, one set
of runbooks — drives organic + AI-search growth for [nexiscro.com](https://nexiscro.com)
across multiple platforms.

## The five tools

| Tool | Command | Role in pipeline | License |
|------|---------|------------------|---------|
| [Claude SEO](https://github.com/AgriciDaniel/claude-seo) | `/seo` | Audits, schema, GEO/AEO, technical, measure | MIT |
| [Claude Blog](https://github.com/AgriciDaniel/claude-blog) | `/blog` | Write + optimize + repurpose content | MIT |
| [FLOW](https://github.com/AgriciDaniel/flow) | `/blog flow` | Evidence-led framework (Find·Leverage·Optimize·Win) | CC BY 4.0 |
| [Banana](https://github.com/AgriciDaniel/banana-claude) | `/banana` | AI image generation (hero, OG, infographics) | MIT |
| [AI Marketing Suite](https://github.com/zubair-trabzada/ai-marketing-claude) | `/market` | Copy, email, social, ads, funnels, distribution | MIT |

## Pipeline

```
DISCOVER → CREATE → ILLUSTRATE → OPTIMIZE → DISTRIBUTE → MEASURE
```

Full stage→command mapping: [`orchestrator.md`](./orchestrator.md).

## Quick start

```bash
# 1. Install all five skill packs into ~/.claude (idempotent)
npm run seo:install            # claude-seo skills-only (fast)
# npm run seo:install:full     # + claude-seo Python deps + Playwright

# 2. Verify
npm run seo:doctor

# 3. (optional) configure API keys — see docs/API-KEYS.md
#    GOOGLE_AI_API_KEY for /banana + blog images; /seo google setup for GSC/GA4

# 4. Run a workflow — prints a runbook to execute inside `claude`
npm run seo:run -- weekly-loop
npm run seo:run -- full-pipeline "shopify llms.txt"

# 5. Self-test the package
npm run seo:test
```

## Package layout (best-practice)

```
seo-suite/
├── README.md            # this file
├── manifest.json        # single source of truth: tools, repos, pins, keys, deps
├── install.sh           # idempotent installer (reads manifest) — --full / --only / --dry-run
├── doctor.sh            # read-only health check (runtime + skills + keys)
├── orchestrator.md      # the unified 6-stage pipeline + command map
├── workflows/           # copy-paste runbooks
│   ├── full-pipeline.md
│   ├── weekly-loop.md
│   ├── audit-only.md
│   ├── content-sprint.md
│   └── distribute.md
├── docs/
│   ├── SETUP.md         # install + per-tool setup
│   ├── API-KEYS.md      # which keys unlock what, where they live
│   └── TROUBLESHOOTING.md
└── tests/
    ├── run-tests.sh     # offline self-tests (CI-safe)
    └── test_manifest.py # manifest validity + consistency
```

Supporting files elsewhere in the repo:
- `scripts/seo-run.mjs` — workflow runbook printer (`npm run seo:run`)
- `scripts/sync-flow.py` — refresh FLOW prompts (vendored in `skills/blog-flow/`)
- `.github/workflows/seo-suite.yml` — manual dispatch + weekly tracking issue + CI

## Design principles

- **Manifest-driven.** `install.sh`, `doctor.sh`, and the tests all read
  `manifest.json`. Add/replace a tool in one place.
- **Faithful installs.** We clone each repo at a pinned ref and run its own
  `install.sh`, so behaviour matches upstream. claude-seo's heavy deps
  (Playwright, pip) are opt-in via `--full`.
- **Idempotent + reversible.** Re-running install is safe; `seo:uninstall` removes
  suite-managed skills.
- **Offline-testable.** `npm run seo:test` needs no network, API keys, or Claude.
- **Triggerable two ways.** Locally via `npm run seo:run`, and in CI via the
  GitHub Action (manual dispatch or weekly schedule).

## Requirements
- Claude Code CLI · Node 18+ · Python 3.10+ · git
- Optional: ImageMagick (Banana post-processing), `reportlab` (Market PDFs),
  Google API credentials, MCP extensions.

See [`docs/SETUP.md`](./docs/SETUP.md) for the full walkthrough.

## Attribution
FLOW framework and prompts © Daniel Agrici, CC BY 4.0. Claude SEO, Claude Blog,
and Banana © Daniel Agrici (MIT). AI Marketing Suite © zubair-trabzada (MIT).
