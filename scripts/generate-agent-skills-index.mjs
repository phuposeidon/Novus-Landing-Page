#!/usr/bin/env node
/**
 * Regenerate /.well-known/agent-skills/index.json digests after editing skill files.
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(root, "public/.well-known/agent-skills");
const indexPath = path.join(skillsDir, "index.json");
const site = "https://nexiscro.com";

const descriptions = {
  "nexis-cro-site": "Navigate nexiscro.com marketing content, pricing, and Shopify install links",
  "install-shopify-app": "Get the Shopify App Store install URL and steps for Nexis CRO",
};

const files = (await readdir(skillsDir)).filter((f) => f.endsWith(".md")).sort();
const skills = [];

for (const file of files) {
  const name = file.replace(/\.md$/, "");
  const body = await readFile(path.join(skillsDir, file));
  const digest = "sha256:" + createHash("sha256").update(body).digest("hex");
  skills.push({
    name,
    type: "skill-md",
    description: descriptions[name] ?? name,
    url: `${site}/.well-known/agent-skills/${file}`,
    digest,
  });
}

const index = {
  $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  skills,
};

await writeFile(indexPath, JSON.stringify(index, null, 2) + "\n");
console.log(`Wrote ${indexPath} (${skills.length} skills)`);
