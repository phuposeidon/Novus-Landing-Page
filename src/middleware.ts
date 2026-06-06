import { defineMiddleware } from "astro:middleware";
import indexMarkdown from "../public/index.md?raw";

/** RFC 8288 / RFC 9727 — homepage Link header for agent discovery */
const LINK_HEADER =
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json", ' +
  '</auth.md>; rel="service-doc"; type="text/markdown", ' +
  '</index.md>; rel="alternate"; type="text/markdown", ' +
  '</llms.txt>; rel="alternate"; type="text/plain"';

const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=yes";

function estimateMarkdownTokens(text: string): string {
  return String(Math.ceil(text.length / 4));
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const accept = context.request.headers.get("Accept") ?? "";

  // Markdown for Agents — content negotiation on homepage
  if (pathname === "/" && accept.includes("text/markdown")) {
    return new Response(indexMarkdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Signal": CONTENT_SIGNAL,
        Vary: "Accept",
        Link: LINK_HEADER,
        "x-markdown-tokens": estimateMarkdownTokens(indexMarkdown),
      },
    });
  }

  const response = await next();

  if (pathname === "/" && response.headers.get("content-type")?.includes("text/html")) {
    const headers = new Headers(response.headers);
    if (!headers.has("Link")) {
      headers.set("Link", LINK_HEADER);
    }
    headers.set("Content-Signal", CONTENT_SIGNAL);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
});
