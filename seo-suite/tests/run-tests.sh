#!/usr/bin/env bash
#
# seo-suite test runner — fast, offline, no Claude Code or API keys required.
# Validates the package is internally consistent and the scripts are sound.
# Exit 0 = all pass. Safe to run in CI.
#
set -uo pipefail

SUITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/.." && pwd)"
ROOT="$(cd "$SUITE_DIR/.." && pwd)"
cd "$ROOT"

C_G='\033[0;32m'; C_R='\033[0;31m'; C_N='\033[0m'
pass=0; fail=0
ok()   { echo -e " ${C_G}PASS${C_N} $*"; pass=$((pass+1)); }
bad()  { echo -e " ${C_R}FAIL${C_N} $*"; fail=$((fail+1)); }
run()  { # run <desc> <cmd...>
  local desc="$1"; shift
  if "$@" >/tmp/seo-test.out 2>&1; then ok "$desc"; else bad "$desc"; sed 's/^/      /' /tmp/seo-test.out; fi
}

echo "── seo-suite tests ───────────────────────────────"

# 1. Manifest is valid + consistent
run "manifest.json valid & consistent" python3 seo-suite/tests/test_manifest.py

# 2. Shell scripts parse cleanly
run "install.sh syntax" bash -n seo-suite/install.sh
run "doctor.sh syntax" bash -n seo-suite/doctor.sh
run "run-tests.sh syntax" bash -n seo-suite/tests/run-tests.sh

# 3. Node runner parses cleanly
run "seo-run.mjs syntax" node --check scripts/seo-run.mjs

# 4. Scripts are executable bits / present
for f in seo-suite/install.sh seo-suite/doctor.sh seo-suite/tests/run-tests.sh; do
  if [[ -x "$f" ]]; then ok "executable: $f"; else bad "not executable: $f (chmod +x)"; fi
done

# 5. Required package files exist
for f in \
  seo-suite/README.md \
  seo-suite/manifest.json \
  seo-suite/orchestrator.md \
  seo-suite/docs/SETUP.md \
  seo-suite/docs/API-KEYS.md \
  seo-suite/docs/TROUBLESHOOTING.md \
  docs/seo-suite.md; do
  if [[ -f "$f" ]]; then ok "exists: $f"; else bad "missing: $f"; fi
done

# 6. All 5 workflow runbooks present
for w in full-pipeline weekly-loop audit-only content-sprint distribute; do
  if [[ -f "seo-suite/workflows/$w.md" ]]; then ok "workflow: $w"; else bad "workflow missing: $w"; fi
done

# 7. seo-run lists + emits a known workflow
run "seo-run lists workflows" node scripts/seo-run.mjs
run "seo-run emits full-pipeline" node scripts/seo-run.mjs full-pipeline "test keyword"
if node scripts/seo-run.mjs full-pipeline "kw-probe" 2>/dev/null | grep -q "kw-probe"; then
  ok "seo-run substitutes argument"
else
  bad "seo-run did not substitute argument"
fi

# 8. npm scripts wired
for s in seo:install seo:doctor seo:run seo:test; do
  if grep -q "\"$s\"" package.json; then ok "npm script: $s"; else bad "npm script missing: $s"; fi
done

# 9. install.sh --dry-run is non-destructive and succeeds
run "install.sh --dry-run" bash seo-suite/install.sh --dry-run

# 10. Every command in manifest is referenced by the orchestrator
missing_cmd=0
while IFS= read -r cmd; do
  grep -qF "$cmd" seo-suite/orchestrator.md || { echo "      orchestrator missing command: $cmd"; missing_cmd=1; }
done < <(python3 -c "import json;[print(t['command']) for t in json.load(open('seo-suite/manifest.json'))['tools']]")
if [[ $missing_cmd -eq 0 ]]; then ok "orchestrator references all tool commands"; else bad "orchestrator missing tool command(s)"; fi

echo "──────────────────────────────────────────────────"
echo -e "Results: ${C_G}${pass} passed${C_N}, $([ $fail -gt 0 ] && echo -e "${C_R}${fail} failed${C_N}" || echo "0 failed")"
[[ $fail -eq 0 ]] || exit 1
