# API keys & credentials

The suite works **fully offline with zero keys** — audits, writing, schema, and
local analysis all run without credentials. Keys unlock *enrichment*: live data,
real image generation, and PDF exports.

> **Never commit keys.** Everything below lives in your shell env or under
> `~/.config` / `~/.banana` with restrictive permissions. `.gitignore` already
> excludes `.dev.vars`, `.cursor/`, and generated artifacts.

## Key matrix

| Key / credential | Unlocks | Tools | Required? | Get it |
|------------------|---------|-------|-----------|--------|
| `GOOGLE_AI_API_KEY` | Gemini image generation + blog images | `/banana`, `/blog` | For image gen | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) (free) |
| Google API (Tier 0) | PageSpeed, CrUX, CrUX History | `/seo google` | No | `/seo google setup` |
| Google API (Tier 1) | Search Console, Indexing API | `/seo google` | No | OAuth / service account |
| Google API (Tier 2) | GA4 organic traffic | `/seo google` | No | GA4 property config |
| Google API (Tier 3) | Keyword Planner volumes | `/seo google` | No | Ads developer token |
| `reportlab` (pip) | Client-ready PDF reports | `/market report-pdf` | No | `pip install reportlab` |
| `GITHUB_TOKEN` | Higher rate limit for FLOW sync | `flow:sync` | No | `gh auth login` |
| MCP extensions | DataForSEO, Ahrefs, SE Ranking, Profound, Firecrawl, Bing | `/seo` | No | per-vendor accounts |

## Where credentials live

| Tool | Location | Notes |
|------|----------|-------|
| Banana | `GOOGLE_AI_API_KEY` env, or MCP config via `/banana setup` | data dir `~/.banana/` |
| Claude SEO | `~/.config/claude-seo/google-api.json` (0600) | run `/seo google setup` wizard |
| Claude Blog | `GOOGLE_AI_API_KEY` env; shares Google API config | |
| FLOW sync | `GITHUB_TOKEN` env (CI uses the Actions token) | optional |

## Setup snippets

**Banana / blog images** — add to `~/.zshrc` (or `~/.bashrc`):

```bash
export GOOGLE_AI_API_KEY="your-key-here"
```

Then in Claude Code: `/banana setup` and `/banana generate "test image"`.

**Claude SEO Google APIs** — interactive wizard:

```
/seo google setup
```

It writes `~/.config/claude-seo/google-api.json` with `0600` permissions and
nothing is transmitted beyond Google's own endpoints.

**Market PDF reports:**

```bash
pip install reportlab
```

## Verifying

```bash
npm run seo:doctor
```

The "API keys / config" section reports which enrichments are active. Anything
marked `○` is optional and unset — the core commands still work without it.

## Security notes
- All keys are local; the suite has no telemetry and no per-domain pricing.
- claude-seo enforces `0600` on its credential file.
- For CI, store secrets as GitHub Actions secrets — never in `manifest.json` or
  any committed file. The suite's CI job runs offline and needs no keys.
