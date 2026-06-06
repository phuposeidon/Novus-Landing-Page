# Setup guide

End-to-end install + configuration for the Nexis SEO Suite.

## Prerequisites

| Requirement | Why | Check |
|-------------|-----|-------|
| Claude Code CLI | runs the `/seo`, `/blog`, `/banana`, `/market` skills | `claude --version` |
| Node 18+ | Banana MCP + repo scripts | `node -v` |
| Python 3.10+ | claude-seo, market scripts, FLOW sync | `python3 -V` |
| git | clones the skill repos | `git --version` |
| ImageMagick *(optional)* | Banana crop/bg-removal/resize | `convert -version` |
| `reportlab` *(optional)* | `/market report-pdf` | `python3 -c "import reportlab"` |

## 1. Install the skill packs

```bash
npm run seo:install
```

What it does (driven by `seo-suite/manifest.json`):
1. Clones each repo at a **pinned ref** into `~/.cache/seo-suite/<tool>`.
2. Runs each upstream `install.sh`, which copies skills → `~/.claude/skills/` and
   agents → `~/.claude/agents/`.
3. For **claude-seo**, installs *skills-only* by default (no Playwright / pip) so
   it's fast and dependency-light. The `/seo` commands work immediately.

For the full claude-seo experience (SPA rendering, PDF reports, CWV depth):

```bash
npm run seo:install:full     # adds Playwright Chromium + Python deps (~400MB)
```

Install a single tool:

```bash
npm run seo:install -- --only banana-claude
```

Preview without changing anything:

```bash
npm run seo:install -- --dry-run
```

> **Restart Claude Code** after installing so it discovers the new skills.

## 2. Verify

```bash
npm run seo:doctor
```

Green check per tool = skill present in `~/.claude/skills`. It also reports
runtime + optional deps + API-key status. Exit code 0 means all required packs
are installed.

## 3. Configure API keys (optional but recommended)

See [`API-KEYS.md`](./API-KEYS.md). Summary:

- **`GOOGLE_AI_API_KEY`** (free, [aistudio.google.com/apikey](https://aistudio.google.com/apikey))
  → `/banana` image generation + Claude Blog images. Set in your shell or via
  `/banana setup`.
- **Google APIs** (GSC, PageSpeed, CrUX, GA4) → run `/seo google setup`; creds live
  under `~/.config/claude-seo/` (0600).
- **`GITHUB_TOKEN`** → avoids rate limits when `npm run flow:sync` pulls FLOW prompts.

## 4. FLOW prompts

FLOW is vendored in `skills/blog-flow/` and refreshed by:

```bash
npm run flow:sync        # pull latest prompts from github.com/AgriciDaniel/flow
npm run flow:install     # mirror skills/ → .cursor/skills/ for Cursor sessions
```

The weekly GitHub Action (`flow-sync.yml`) opens a PR when prompts change.

## 5. Run a workflow

```bash
npm run seo:run                       # list workflows
npm run seo:run -- weekly-loop        # the Mon→Fri cadence
npm run seo:run -- full-pipeline "shopify aeo checklist"
```

The runner prints a runbook. Open `claude` in the repo root and execute the
slash-command steps in order.

## 6. Self-test

```bash
npm run seo:test
```

Offline checks: manifest validity, script syntax, workflow presence, npm wiring,
dry-run install. Runs in CI on every push (`.github/workflows/seo-suite.yml`).

## Uninstall

```bash
npm run seo:uninstall              # remove all suite-managed skills/agents
npm run seo:uninstall -- --only market   # or one tool
```

(FLOW is vendored in-repo and is not removed by uninstall.)
