# Troubleshooting

## `npm run seo:doctor` shows a tool as missing (✗)

The skill files aren't in `~/.claude/skills`. Reinstall just that tool:

```bash
npm run seo:install -- --only <id>     # ids: claude-seo claude-blog banana-claude ai-marketing-claude flow
```

Then **restart Claude Code** — it only discovers skills at session start.

## Slash commands (`/seo`, `/banana`, `/market`) don't appear in Claude Code

1. Confirm install: `npm run seo:doctor` (all green).
2. Restart the Claude Code session (`exit`, then `claude`).
3. Check the skill exists: `ls ~/.claude/skills/seo ~/.claude/skills/banana ~/.claude/skills/market`.
4. Plugin alternative: `/plugin marketplace add AgriciDaniel/claude-seo` then
   `/plugin install claude-seo@agricidaniel-claude-seo`.

## `install.sh` fails to clone (network / rate limit)

- Re-run; clones are shallow and idempotent.
- Behind a proxy? Ensure `git` can reach github.com: `git ls-remote https://github.com/AgriciDaniel/flow.git`.
- FLOW sync specifically: set `GITHUB_TOKEN` to lift the API rate limit, or rely on
  the vendored copy in `skills/blog-flow/references/` (sync is best-effort).

## claude-seo: `/seo audit` works but visual/PDF features fail

You installed skills-only (the default). Add the heavy deps:

```bash
npm run seo:install:full
```

This installs Playwright Chromium (SPA rendering / screenshots) and the Python
requirements (WeasyPrint, matplotlib, trafilatura, htmldate) into a venv at
`~/.claude/skills/seo/.venv`. To retry just the deps:

```bash
~/.claude/skills/seo/.venv/bin/pip install -r ~/.claude/skills/seo/requirements.txt
```

## `/banana generate` returns an auth error

`GOOGLE_AI_API_KEY` isn't set or MCP isn't configured. See
[`API-KEYS.md`](./API-KEYS.md). Quick fix:

```bash
export GOOGLE_AI_API_KEY="..."   # then restart Claude Code, run /banana setup
```

Post-processing (crop/resize) also needs ImageMagick: `sudo apt install imagemagick`.

## `/market report-pdf` errors

Install reportlab: `pip install reportlab`. Markdown reports (`/market report`)
work without it.

## `npm run seo:test` fails

Read the `FAIL` lines — each prints the underlying error. Common causes:
- Edited `manifest.json` into an invalid shape → `test_manifest.py` explains which
  field/assertion broke.
- A script lost its executable bit → `chmod +x seo-suite/install.sh seo-suite/doctor.sh seo-suite/tests/run-tests.sh`.
- A workflow file was renamed → keep the five names in `workflows/`.

## FLOW prompts look stale

```bash
npm run flow:sync           # pull latest (uses GITHUB_TOKEN if set)
npm run flow:install        # mirror into .cursor/skills for Cursor
```

If lockfile drift blocks it: `python3 scripts/sync-flow.py --allow-drift`.

## Reset everything

```bash
npm run seo:uninstall       # remove suite-managed skills/agents
rm -rf ~/.cache/seo-suite   # clear clones
npm run seo:install         # fresh install
```
