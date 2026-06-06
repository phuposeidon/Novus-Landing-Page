#!/usr/bin/env bash
#
# seo-suite installer — installs the 5 Claude Code skill packs that make up the
# Nexis SEO automation suite, reading seo-suite/manifest.json as the source of truth.
#
# Each upstream tool installs by copying skill files into ~/.claude/skills and
# agents into ~/.claude/agents. We clone each repo (pinned ref) into a cache dir
# and run its own install.sh so behaviour stays faithful to upstream.
#
# claude-seo's installer also pip-installs heavy deps + Playwright. We skip that
# by default (skills-only) so the /seo commands work without a 400MB download.
# Pass --full to run the complete claude-seo install (pip + Playwright).
#
# Usage:
#   ./install.sh                 # install all tools (claude-seo skills-only)
#   ./install.sh --full          # include claude-seo pip deps + Playwright
#   ./install.sh --only seo      # install a single tool by id
#   ./install.sh --dry-run       # print plan, change nothing
#   ./install.sh --uninstall     # remove suite-installed skills/agents
#
set -euo pipefail

SUITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
MANIFEST="${SUITE_DIR}/manifest.json"
CACHE_DIR="${SEO_SUITE_CACHE:-$HOME/.cache/seo-suite}"
SKILLS_DIR="$HOME/.claude/skills"
AGENTS_DIR="$HOME/.claude/agents"

FULL=0
DRY_RUN=0
ONLY=""
UNINSTALL=0

C_G='\033[0;32m'; C_Y='\033[1;33m'; C_R='\033[0;31m'; C_B='\033[0;34m'; C_N='\033[0m'
info() { echo -e "${C_G}[seo-suite]${C_N} $*"; }
warn() { echo -e "${C_Y}[seo-suite]${C_N} $*"; }
err()  { echo -e "${C_R}[seo-suite]${C_N} $*" >&2; }
step() { echo -e "${C_B}==>${C_N} $*"; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --full) FULL=1; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    --only) ONLY="${2:-}"; shift 2 ;;
    --uninstall) UNINSTALL=1; shift ;;
    -h|--help) sed -n '2,30p' "$0"; exit 0 ;;
    *) err "Unknown arg: $1"; exit 2 ;;
  esac
done

command -v git >/dev/null 2>&1 || { err "git is required"; exit 1; }
command -v python3 >/dev/null 2>&1 || { err "python3 is required (manifest parsing)"; exit 1; }
[[ -f "$MANIFEST" ]] || { err "manifest not found: $MANIFEST"; exit 1; }

# jq-free manifest reader: emit one line per tool as TAB-separated fields.
read_tools() {
  python3 - "$MANIFEST" <<'PY'
import json, sys
m = json.load(open(sys.argv[1]))
for t in m["tools"]:
    print("\t".join([
        t["id"], t["repo"], t["ref"], t["installer"], t["installMode"],
        t.get("provides", {}).get("primarySkill", ""),
    ]))
PY
}

expand() { echo "${1/#\~/$HOME}"; }

if [[ $UNINSTALL -eq 1 ]]; then
  warn "Uninstall removes suite-managed skills/agents from ~/.claude (not the cache)."
  while IFS=$'\t' read -r id repo ref installer mode primary; do
    [[ -n "$ONLY" && "$ONLY" != "$id" ]] && continue
    case "$id" in
      claude-seo)  rm -rf "$SKILLS_DIR"/seo "$SKILLS_DIR"/seo-* "$AGENTS_DIR"/seo-*.md 2>/dev/null || true ;;
      claude-blog) rm -rf "$SKILLS_DIR"/blog "$SKILLS_DIR"/blog-* "$AGENTS_DIR"/blog-*.md 2>/dev/null || true ;;
      banana-claude) rm -rf "$SKILLS_DIR"/banana "$AGENTS_DIR"/brief-constructor.md 2>/dev/null || true ;;
      ai-marketing-claude) rm -rf "$SKILLS_DIR"/market "$SKILLS_DIR"/market-* "$AGENTS_DIR"/market-*.md 2>/dev/null || true ;;
      flow) warn "flow is vendored in-repo (skills/blog-flow); not removed by uninstall." ;;
    esac
    info "Removed: $id"
  done < <(read_tools)
  exit 0
fi

mkdir -p "$CACHE_DIR" "$SKILLS_DIR" "$AGENTS_DIR"
step "Cache:  $CACHE_DIR"
step "Skills: $SKILLS_DIR"
echo ""

clone_or_update() {
  local id="$1" repo="$2" ref="$3" dest="$4"
  if [[ -d "$dest/.git" ]]; then
    info "$id: updating $ref"
    (cd "$dest" && git fetch --depth 1 origin "$ref" >/dev/null 2>&1 && git checkout -q FETCH_HEAD 2>/dev/null) \
      || (cd "$dest" && git fetch --depth 1 origin "$ref" >/dev/null 2>&1 && git checkout -q "$ref" 2>/dev/null) \
      || warn "$id: could not fast-update; using existing checkout"
  else
    info "$id: cloning $repo@$ref"
    git clone --depth 1 --branch "$ref" "$repo" "$dest" >/dev/null 2>&1 \
      || git clone --depth 1 "$repo" "$dest" >/dev/null 2>&1
  fi
}

installed=0; skipped=0
while IFS=$'\t' read -r id repo ref installer mode primary; do
  [[ -n "$ONLY" && "$ONLY" != "$id" ]] && continue

  step "$id ($ref)"

  if [[ "$installer" == "sync" ]]; then
    # flow is vendored in-repo and refreshed by scripts/sync-flow.py
    if [[ $DRY_RUN -eq 1 ]]; then
      info "$id: would run repo sync (npm run flow:sync)"
    else
      if [[ -f "$SUITE_DIR/../scripts/sync-flow.py" ]]; then
        python3 "$SUITE_DIR/../scripts/sync-flow.py" --allow-drift >/dev/null 2>&1 \
          && info "$id: FLOW prompts synced" \
          || warn "$id: sync skipped (offline or rate-limited); vendored copy retained"
      else
        warn "$id: scripts/sync-flow.py missing; vendored copy retained"
      fi
    fi
    installed=$((installed+1)); echo ""; continue
  fi

  dest="$CACHE_DIR/$id"
  if [[ $DRY_RUN -eq 1 ]]; then
    info "$id: would clone $repo@$ref and run $installer ($mode)"
    skipped=$((skipped+1)); echo ""; continue
  fi

  clone_or_update "$id" "$repo" "$ref" "$dest"
  if [[ ! -d "$dest" ]]; then err "$id: clone failed"; echo ""; continue; fi

  case "$id" in
    claude-seo)
      if [[ $FULL -eq 1 ]]; then
        info "claude-seo: full install (pip deps + Playwright)"
        CLAUDE_SEO_TAG="$ref" bash "$dest/install.sh" || warn "claude-seo: upstream installer reported issues"
      else
        # skills-only: copy skill packs + agents + scripts/schema without pip/Playwright
        cp -r "$dest/skills/seo/." "$SKILLS_DIR/seo/" 2>/dev/null || mkdir -p "$SKILLS_DIR/seo" && cp -r "$dest/skills/seo/." "$SKILLS_DIR/seo/"
        for d in "$dest"/skills/*/; do
          n="$(basename "$d")"; mkdir -p "$SKILLS_DIR/$n"; cp -r "$d." "$SKILLS_DIR/$n/"
        done
        cp -r "$dest"/agents/*.md "$AGENTS_DIR/" 2>/dev/null || true
        [[ -d "$dest/schema" ]] && { mkdir -p "$SKILLS_DIR/seo/schema"; cp -r "$dest/schema/." "$SKILLS_DIR/seo/schema/"; }
        [[ -d "$dest/scripts" ]] && { mkdir -p "$SKILLS_DIR/seo/scripts"; cp -r "$dest/scripts/." "$SKILLS_DIR/seo/scripts/"; }
        cp "$dest/requirements.txt" "$SKILLS_DIR/seo/requirements.txt" 2>/dev/null || true
        info "claude-seo: skills-only installed (run with --full for Playwright + pip deps)"
      fi
      ;;
    *)
      # Run upstream installer. Some installers (e.g. banana) end with an
      # optional setup-validation step that exits non-zero when an API key/MCP
      # isn't configured yet — that does NOT mean the skill files failed to copy.
      # So we judge success by whether the primary skill actually landed.
      bash "$dest/install.sh" </dev/null >/dev/null 2>&1 || true
      if [[ -n "$primary" && -e "$SKILLS_DIR/$primary/SKILL.md" ]]; then
        info "$id: installed (skill: $primary)"
      else
        warn "$id: skill '$primary' not found after install; check $dest"
      fi
      ;;
  esac
  installed=$((installed+1))
  echo ""
done < <(read_tools)

step "Done. installed=$installed dry-run-skipped=$skipped"
if [[ $DRY_RUN -eq 0 ]]; then
  info "Verify with: npm run seo:doctor"
  info "Restart Claude Code to load new skills."
fi
