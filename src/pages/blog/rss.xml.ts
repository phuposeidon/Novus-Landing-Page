import { getCollection } from "astro:content";

export const prerender = true;

const site = "https://nexiscro.com";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.id}/`;
      const pubDate = post.data.pubDate.toUTCString();
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nexis CRO Blog — Shopify AEO &amp; AI SEO Guides</title>
    <link>${site}/blog/</link>
    <description>Practical Answer Engine Optimization guides for Shopify: llms.txt, schema, AI citations, robots.txt.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${site}/brand-mark.svg</url>
      <title>Nexis CRO</title>
      <link>${site}/blog/</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
