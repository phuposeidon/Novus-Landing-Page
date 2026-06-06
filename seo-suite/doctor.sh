#!/usr/bin/env bash
#
# seo-suite doctor — verifies the 5 skill packs are installed and the runtime
# prerequisites + optional enrichments are present. Read-only; changes nothing.
#
# Exit code 0 = all required tools present; 1 = one or more missing.
#
set -uo pipefail

SUITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
MANIFEST="${SUITE_DIR}/manifest.json"
SKILLS_DIR="$HOME/.claude/skills"
AGENTS_DIR="$HOME/.claude/agents"

C_G='\033[0;32m'; C_Y='\033[1;33m'; C_R='\033[0;31m'; C_N='\033[0m'
ok()   { echo -e " ${C_G}✓${C_N} $*"; }
no()   { echo -e " ${C_R}✗${C_N} $*"; }
opt()  { echo -e " ${C_Y}○${C_N} $*"; }

command -v python3 >/dev/null 2>&1 || { echo "python3 required"; exit 1; }
[[ -f "$MANIFEST" ]] || { echo "manifest not found: $MANIFEST"; exit 1; }

echo "── seo-suite doctor ──────────────────────────────"
echo "Skills dir: $SKILLS_DIR"
echo ""

echo "Runtime:"
if command -v node >/dev/null 2>&1; then ok "node $(node -v)"; else no "node (needed by banana)"; fi
if command -v python3 >/dev/null 2>&1; then ok "python3 $(python3 -V 2>&1 | awk '{print $2}')"; else no "python3"; fi
if command -v git >/dev/null 2>&1; then ok "git"; else no "git"; fi
if command -v claude >/dev/null 2>&1; then ok "claude CLI $(claude --version 2>/dev/null | awk '{print $1}')"; else opt "claude CLI not on PATH"; fi
if command -v convert >/dev/null 2>&1 || command -v magick >/dev/null 2>&1; then ok "imagemagick (banana post-processing)"; else opt "imagemagick (optional — banana crop/resize)"; fi
if python3 -c "import reportlab" 2>/dev/null; then ok "reportlab (market PDF reports)"; else opt "reportlab (optional — pip install reportlab for /market report-pdf)"; fi
echo ""

# Per-tool skill presence, driven by the manifest.
TOOLS=$(python3 - "$MANIFEST" <<'PY'
import json, sys
m = json.load(open(sys.argv[1]))
for t in m["tools"]:
    p = t.get("provides", {})
    print("\t".join([t["id"], t["label"], t["command"], p.get("primarySkill","")]))
PY
)

echo "Skill packs:"
missing=0
while IFS=$'\t' read -r id label cmd primary; do
  if [[ -n "$primary" && ( -f "$SKILLS_DIR/$primary/SKILL.md" || -d "$SKILLS_DIR/$primary" ) ]]; then
    count=$(ls -d "$SKILLS_DIR/${primary%%-*}"* 2>/dev/null | wc -l | tr -d ' ')
    ok "$label — $cmd (skill: $primary)"
  else
    no "$label — $cmd (missing skill: $primary)  → npm run seo:install -- --only $id"
    missing=$((missing+1))
  fi
done <<< "$TOOLS"
echo ""

echo "API keys / config (optional enrichment):"
[[ -n "${GOOGLE_AI_API_KEY:-}" ]] && ok "GOOGLE_AI_API_KEY set (banana + blog images)" || opt "GOOGLE_AI_API_KEY unset (banana generation, blog images)"
[[ -f "$HOME/.config/claude-seo/google-api.json" ]] && ok "claude-seo Google API config present" || opt "claude-seo Google API not configured (run: /seo google setup)"
[[ -d "$HOME/.banana" ]] && ok "~/.banana data dir present" || opt "~/.banana not created yet (run /banana setup)"
echo ""

if [[ $missing -eq 0 ]]; then
  echo -e "${C_G}All skill packs installed.${C_N} Restart Claude Code if commands aren't visible."
  exit 0
else
  echo -e "${C_R}$missing skill pack(s) missing.${C_N} Run: npm run seo:install"
  exit 1
fi
