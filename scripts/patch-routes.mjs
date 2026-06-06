#!/usr/bin/env node
/**
 * Cloudflare Pages: `/app-review/*` does not exclude the bare path `/app-review`.
 * Patch dist/_routes.json after astro build so the static index.html is served.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const routesPath = join(process.cwd(), "dist", "_routes.json");
if (!existsSync(routesPath)) {
  console.warn("patch-routes: dist/_routes.json not found, skipping");
  process.exit(0);
}

const routes = JSON.parse(readFileSync(routesPath, "utf8"));
const required = [
  "/app-review",
  "/app-review/*",
  "/videos/*",
  "/privacy",
  "/privacy/*",
  "/llms.txt",
];
const exclude = new Set([...(routes.exclude ?? []), ...required]);
routes.exclude = [...exclude];
writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`);
console.log("patch-routes: ensured static excludes for /app-review, /privacy");
