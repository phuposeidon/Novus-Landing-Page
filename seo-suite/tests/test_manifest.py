#!/usr/bin/env python3
"""Validate seo-suite/manifest.json — the single source of truth.

Asserts every tool entry is well-formed and internally consistent so that
install.sh / doctor.sh / seo-run can rely on the shape. Run via run-tests.sh
or directly: python3 seo-suite/tests/test_manifest.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "..", "manifest.json")

REQUIRED_TOOL_FIELDS = {
    "id", "label", "repo", "ref", "license", "command",
    "installer", "installMode", "stages", "provides", "verify",
}
VALID_STAGES = {"discover", "create", "illustrate", "optimize", "distribute", "measure"}
VALID_INSTALLERS = {"install.sh", "sync"}
EXPECTED_IDS = {
    "claude-seo", "claude-blog", "flow", "banana-claude", "ai-marketing-claude",
}

failures = []


def check(cond, msg):
    if not cond:
        failures.append(msg)


def main():
    with open(MANIFEST) as fh:
        m = json.load(fh)

    check("tools" in m, "manifest missing 'tools'")
    check(m.get("name") == "nexis-seo-suite", "unexpected suite name")
    check(set(m.get("pipeline", [])) == VALID_STAGES,
          f"pipeline must cover exactly {sorted(VALID_STAGES)}")

    ids = [t.get("id") for t in m["tools"]]
    check(len(ids) == 5, f"expected 5 tools, got {len(ids)}")
    check(set(ids) == EXPECTED_IDS,
          f"tool ids mismatch: {set(ids) ^ EXPECTED_IDS}")
    check(len(ids) == len(set(ids)), "duplicate tool ids")

    for t in m["tools"]:
        tid = t.get("id", "<no-id>")
        missing = REQUIRED_TOOL_FIELDS - set(t)
        check(not missing, f"{tid}: missing fields {missing}")

        check(t.get("repo", "").startswith("https://github.com/"),
              f"{tid}: repo must be an https github url")
        check(t.get("repo", "").endswith(".git"),
              f"{tid}: repo should end with .git")
        check(t.get("installer") in VALID_INSTALLERS,
              f"{tid}: installer must be one of {VALID_INSTALLERS}")

        stages = t.get("stages", [])
        check(stages, f"{tid}: must declare at least one stage")
        for s in stages:
            check(s in VALID_STAGES, f"{tid}: invalid stage '{s}'")

        provides = t.get("provides", {})
        check("primarySkill" in provides, f"{tid}: provides.primarySkill required")

        verify = t.get("verify", {})
        check(verify.get("command", "").startswith("/"),
              f"{tid}: verify.command should be a slash command")

    # Every pipeline stage must be covered by at least one tool.
    covered = {s for t in m["tools"] for s in t.get("stages", [])}
    check(covered == VALID_STAGES,
          f"stages not covered by any tool: {VALID_STAGES - covered}")

    # API key entries must reference real tool ids.
    for k in m.get("apiKeys", []):
        for used in k.get("usedBy", []):
            check(used in EXPECTED_IDS,
                  f"apiKey {k.get('name')}: usedBy '{used}' is not a known tool")

    if failures:
        print("MANIFEST VALIDATION FAILED:")
        for f in failures:
            print(f"  - {f}")
        sys.exit(1)
    print(f"manifest OK: {len(m['tools'])} tools, stages {sorted(covered)}")


if __name__ == "__main__":
    main()
