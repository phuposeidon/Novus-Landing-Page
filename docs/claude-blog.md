# claude-blog integration

This project uses [claude-blog](https://github.com/AgriciDaniel/claude-blog) for SEO/AEO blog production.

## Installed locations

| Path | Purpose |
|------|---------|
| `~/.claude/skills/blog*` | Global Claude Code skills (30 sub-skills) |
| `~/.claude/agents/blog-*` | Researcher, reviewer, writer agents |
| `~/.claude/scripts/*.py` | Quality scoring, preflight, render helpers |
| `.cursor/skills/` | Project copy for Cursor agent sessions |
| `BRAND.md` / `VOICE.md` | Editorial context auto-loaded by blog sub-skills |

## Workflow (Cursor)

1. **Strategy:** Read `.cursor/skills/blog-strategy/SKILL.md` or run outline via `blog-outline`
2. **Brand:** `BRAND.md` and `VOICE.md` at project root (already initialized for Nexis CRO)
3. **Write:** Follow `blog-write` workflow; save markdown to `src/content/blog/`
4. **Analyze:** `python3 ~/.claude/scripts/analyze_blog.py src/content/blog/<slug>.md`
5. **Schema:** Article + FAQPage JSON-LD emitted via `BlogLayout.astro`

## Commands reference

See the [claude-blog README](https://github.com/AgriciDaniel/claude-blog#commands) for `/blog write`, `/blog analyze`, `/blog geo`, `/blog cluster`, etc.

## Content location

- Posts: `src/content/blog/*.md`
- Listing: `/blog`
- Post URLs: `/blog/<slug>/`
