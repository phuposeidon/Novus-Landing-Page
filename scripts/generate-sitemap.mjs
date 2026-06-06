#!/usr/bin/env node
/**
 * Regenerate public/sitemap.xml from static routes + src/content/blog/*.md
 * priority and changefreq omitted — Google ignores them (per Google docs).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const outPath = path.join(root, "public/sitemap.xml");
const site = "https://nexiscro.com";

const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { loc: `${site}/`, lastmod: today },
  { loc: `${site}/blog/`, lastmod: today },
  { loc: `${site}/about/`, lastmod: today },
  { loc: `${site}/privacy` },
];

function parseDate(content, key) {
  const m = content.match(new RegExp(`${key}:\\s*(\\d{4}-\\d{2}-\\d{2})`));
  return m?.[1] ?? null;
}

function isDraft(content) {
  return /draft:\s*true/.test(content);
}

const blogFiles = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
const blogRoutes = [];

for (const file of blogFiles) {
  const content = await readFile(path.join(blogDir, file), "utf8");
  if (isDraft(content)) continue;

  const slug = file.replace(/\.md$/, "");
  const lastmod = parseDate(content, "updatedDate") ?? parseDate(content, "pubDate");

  blogRoutes.push({ loc: `${site}/blog/${slug}/`, lastmod });
}

blogRoutes.sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""));

const urls = [...staticRoutes, ...blogRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
    return `  <url>
    <loc>${u.loc}</loc>${lastmod}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile(outPath, xml, "utf8");
console.log(`Wrote ${outPath} (${urls.length} URLs, ${blogRoutes.length} blog posts)`);
