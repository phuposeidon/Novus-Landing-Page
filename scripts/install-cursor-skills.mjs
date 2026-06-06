#!/usr/bin/env node
/**
 * Mirror committed skills/ into .cursor/skills/ for Cursor agent sessions.
 * .cursor/ is gitignored; skills/ at repo root is the source of truth.
 */
import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "skills");
const dest = join(root, ".cursor", "skills");

if (!existsSync(src)) {
  console.error("install-cursor-skills: skills/ not found");
  process.exit(1);
}

await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true, force: true });
console.log(`install-cursor-skills: synced ${src} → ${dest}`);
