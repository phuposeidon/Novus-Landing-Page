#!/usr/bin/env node
/**
 * seo-run — print a seo-suite workflow runbook so you can execute it inside a
 * Claude Code session. This intentionally does NOT shell out to `claude`: the
 * slash-command stages are interactive and run in your Claude Code session.
 *
 * Usage:
 *   npm run seo:run -- <workflow> ["arg"]
 *   npm run seo:run            # list workflows
 *
 * Workflows: full-pipeline | weekly-loop | audit-only | content-sprint | distribute
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wfDir = join(root, "seo-suite", "workflows");

const [, , wfArg, ...rest] = process.argv;
const arg = rest.join(" ").trim();

function list() {
  const files = existsSync(wfDir)
    ? readdirSync(wfDir).filter((f) => f.endsWith(".md"))
    : [];
  console.log("seo-suite workflows:\n");
  for (const f of files) {
    const name = f.replace(/\.md$/, "");
    const first = readFileSync(join(wfDir, f), "utf8")
      .split("\n")
      .find((l) => l.startsWith("# ")) || "";
    console.log(`  ${name.padEnd(16)} ${first.replace(/^#\s*/, "")}`);
  }
  console.log("\nRun:  npm run seo:run -- <workflow> [\"arg\"]");
  console.log("Then execute the printed steps inside `claude`.");
}

if (!wfArg) {
  list();
  process.exit(0);
}

const file = join(wfDir, `${wfArg}.md`);
if (!existsSync(file)) {
  console.error(`Unknown workflow: ${wfArg}\n`);
  list();
  process.exit(1);
}

let body = readFileSync(file, "utf8");
if (arg) {
  body = body
    .replaceAll("<keyword>", arg)
    .replaceAll("<KEYWORD>", arg)
    .replaceAll("<cluster>", arg)
    .replaceAll('"src/content/blog/<slug>.md"', `"${arg}"`);
}

console.log(`\n${"─".repeat(60)}`);
console.log(`seo-suite › ${wfArg}${arg ? ` › ${arg}` : ""}`);
console.log(`${"─".repeat(60)}\n`);
console.log(body);
console.log(`\n${"─".repeat(60)}`);
console.log("Open `claude` in this repo and run the steps above in order.");
console.log("Verify install first:  npm run seo:doctor");
