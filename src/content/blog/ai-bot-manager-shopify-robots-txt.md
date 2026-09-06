---
title: "Shopify robots.txt Guide [2026]: How to Configure robots.txt.liquid for AI Crawlers & SEO"
description: "Learn how to edit robots.txt.liquid in Shopify. Complete guide on allowing GPTBot, ClaudeBot, and PerplexityBot without breaking core Google SEO ranking."
pubDate: 2026-06-10
updatedDate: 2026-06-10
author: "Nexis CRO Editorial Team"
tags:
  - robots.txt
  - AI Crawlers
  - Shopify
  - AEO
heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80"
heroImageAlt: "Server room lights representing web crawler access policy for Shopify stores"
faq:
  - question: "Does Shopify block AI bots by default?"
    answer: "No. Shopify's default robots.txt allows major crawlers including GPTBot, ClaudeBot, and PerplexityBot on product, collection, blog, and page URLs. Merchants must add explicit Disallow rules in robots.txt.liquid to block them."
  - question: "Where do I edit robots.txt on Shopify?"
    answer: "Create or edit templates/robots.txt.liquid in your theme code editor. Do not replace Shopify's default Liquid loop; add per-user-agent rules below it per Shopify Help Center guidance."
  - question: "Should I block GPTBot on my Shopify store?"
    answer: "Most ecommerce stores should allow retrieval bots in 2026 to stay visible in ChatGPT Shopping and Perplexity citations. Block training-focused bots only if you have a specific legal or brand policy reason."
  - question: "Can Cloudflare block AI bots even when robots.txt allows them?"
    answer: "Yes. CDN bot management and WAF rules can return 403 responses while robots.txt says Allow. Audit server logs and CDN settings, not just robots.txt.liquid."
category: "ai-seo"
draft: false
---

<div class="key-takeaways">

**Key Takeaways**

- Shopify **allows AI crawlers by default** on catalog URLs; blocking requires explicit `robots.txt.liquid` rules ([Shopify Help Center](https://help.shopify.com/en/manual/promoting-marketing/seo/editing-robots-txt)).
- Six user-agents matter for citation in 2026: **GPTBot**, **OAI-SearchBot**, **ClaudeBot**, **PerplexityBot**, **Google-Extended**, and **CCBot** ([Kaspian Fuad, 2026](https://kaspianfuad.com/blog/shopify-robots-txt-ai-crawlers/)).
- Blocking **GPTBot** does not always block **ChatGPT Shopping** citations; OAI-SearchBot and ChatGPT-User serve different roles ([Shopify Ranked](https://shopifyranked.com/shopify-seo/robots-txt-ai-bots/)).
- Pair crawler policy with [llms.txt](/blog/llms-txt-shopify-stores/) and [schema markup](/blog/shopify-json-ld-schema-ai-search/) in your [AEO stack](/blog/shopify-aeo-guide-2026/).

</div>

## Why AI Bot Policy Matters on Shopify

Your robots.txt file tells crawlers which URLs they may fetch. For AI search, the decision is strategic: allow retrieval bots and your products can surface in ChatGPT, Perplexity, and Google AI answers. Block them broadly and you opt out of the fastest-growing referral channel on Shopify without touching a single product page.

Shopify's platform stance is **opt-out, not opt-in**. Default rules allow major bots the same way they allow Googlebot ([Shopify Ranked, 2026](https://shopifyranked.com/shopify-seo/robots-txt-ai-bots/)). That is good news for merchants chasing AI shopping visibility, but it also means silence equals permission. If you never audit crawler access, you may still lose citations because Cloudflare, a theme edit, or an old `Disallow: /policies/` rule blocks bots at the edge.

AI Bot Manager is not about fear of scrapers. It is about **intentional policy**: which engines may read your catalog, which paths stay private, and how that policy stays stable after theme updates.

## The Six AI User-Agents to Know

| User-agent | Operator | Primary role |
| --- | --- | --- |
| GPTBot | OpenAI | Training and broad crawl |
| OAI-SearchBot | OpenAI | ChatGPT Search grounding |
| ChatGPT-User | OpenAI | On-demand fetch when users click citations |
| ClaudeBot | Anthropic | Claude web retrieval |
| PerplexityBot | Perplexity | Citation indexing |
| Google-Extended | Google | Gemini / AI training opt-out token |

Perplexity-User fetches specific pages during live queries. CCBot (Common Crawl) feeds multiple downstream models ([Surfient AI bots guide](https://www.surfient.com/guides/robots-txt-ai-bots-shopify)).

**Critical distinction:** GPTBot is training-oriented. OAI-SearchBot and ChatGPT-User power search and shopping experiences. Blocking GPTBot alone does not remove your store from every ChatGPT citation path ([Shopify Ranked](https://shopifyranked.com/shopify-seo/robots-txt-ai-bots/)).

## Three Policy Positions (Pick One Deliberately)

### 1. Allow all (default, best for most stores)

Keep Shopify defaults plus explicit `Allow` comments for auditability. Maximizes AI shopping and citation surfaces. Recommended when AI discovery is a growth channel.

### 2. Block training, allow retrieval

Disallow GPTBot, ClaudeBot, and Google-Extended while allowing OAI-SearchBot, PerplexityBot, and ChatGPT-User. Use when brand policy restricts model training but you still want shopping visibility ([Shopify Ranked matrix](https://shopifyranked.com/shopify-seo/robots-txt-ai-bots/)).

### 3. Block all AI bots (rare for ecommerce)

Explicit `Disallow: /` per AI user-agent. Almost never correct for product catalogs. Occasionally justified for editorial brands with proprietary content and no AI channel ambition.

## How to Edit robots.txt.liquid on Shopify

You cannot edit `robots.txt` as a static file. Shopify generates it from **`templates/robots.txt.liquid`** ([Shopify Help Center](https://help.shopify.com/en/manual/promoting-marketing/seo/editing-robots-txt)).

**Rules:**

1. **Keep Shopify's default Liquid loop** so platform updates still apply.
2. Add custom user-agent blocks **below** the default output.
3. Never replace the template with plain text only.
4. Disallow `/cart`, `/checkout`, `/account`, and `/admin` for all bots (Shopify defaults already handle most of this).

### Recommended allowlist block (GEO-friendly)

Add after the default loop ([Surfient template](https://www.surfient.com/guides/robots-txt-ai-bots-shopify)):

```liquid
# AI retrieval bots — explicit allow for audit trail
{%- comment -%} GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot {%- endcomment -%}
```

```text
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /
```

Named allows are redundant when `User-agent: *` already permits crawling, but they document intent for your team and future theme migrations.

### Example block (training opt-out)

```text
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Leave PerplexityBot and OAI-SearchBot allowed if citations still matter to you.

## Verify Crawler Access (Do Not Trust robots.txt Alone)

Run from terminal:

```bash
curl -A "GPTBot" -I https://yourstore.com/products/example
curl -A "PerplexityBot" -I https://yourstore.com/robots.txt
```

Expect `HTTP/2 200` on product URLs you want cited. A `403` with permissive robots.txt usually means **Cloudflare Bot Fight Mode** or similar CDN rules ([Surfient](https://www.surfient.com/guides/robots-txt-ai-bots-shopify)).

Also check:

- Theme `robots.txt.liquid` did not add broad `Disallow: /policies/` that blocks helpful policy pages AI assistants cite
- No accidental `Disallow: /` inside a wildcard group
- [llms.txt](/blog/llms-txt-shopify-stores/) is fetchable if you publish it (bots must reach `/llms.txt`)

## robots.txt vs llms.txt vs Schema

| Layer | Function |
| --- | --- |
| robots.txt | Permission to crawl URLs |
| llms.txt | Curated map of important URLs |
| JSON-LD | Typed product facts on each page |

Blocking bots while publishing llms.txt sends mixed signals. Allow retrieval bots, ship llms.txt, and fix [schema gaps](/blog/shopify-json-ld-schema-ai-search/) together.

## Production-Ready Shopify robots.txt for AI Crawlers (Copy & Paste)

If you need to edit your Shopify store's `robots.txt.liquid` manually to ensure search & retrieval AI crawlers can index your catalog while keeping aggressive scrapers away, use this tested production snippet.

In your Shopify Admin, navigate to **Online Store > Themes > Edit code**, locate or create `templates/robots.txt.liquid`, and apply this pattern:

```liquid
{% comment %}
  Verified robots.txt for Shopify AI Search Engine Optimization (AEO)
{% endcomment %}
{% for group in robots.default_groups %}
  {{ group.user_agent }}

  {% for rule in group.rules %}
    {{ rule }}
  {% endfor %}

  {% if group.sitemap != blank %}
    {{ group.sitemap }}
  {% endif %}
{% endfor %}

# Explicit directives for leading AI search engines
User-agent: GPTBot
Allow: /products/
Allow: /collections/
Allow: /pages/
Allow: /llms.txt
Disallow: /cart
Disallow: /checkout
Disallow: /account

User-agent: PerplexityBot
Allow: /products/
Allow: /collections/
Allow: /pages/
Allow: /llms.txt
Disallow: /cart
Disallow: /checkout

User-agent: ClaudeBot
Allow: /products/
Allow: /collections/
Allow: /pages/
Allow: /llms.txt
Disallow: /cart
Disallow: /checkout
```

> **Warning:** Never delete `{{ group.user_agent }}` or `{{ rule }}` from `robots.txt.liquid`. Shopify relies on those template tags to maintain core checkout security and localized routing rules.

## When to Re-Audit

- After every theme migration or agency handoff
- When AI referral traffic drops in GA4 week over week
- When [citation tracking](/blog/track-chatgpt-citations-ecommerce/) shows competitors replacing you on core prompts
- After enabling Cloudflare bot protection

With the [Nexis CRO AI SEO & AEO suite](/) and its built-in AI Bot Manager, you can configure per-bot allow/block rules directly from the Shopify admin without risky manual code edits.

<div class="cta-box">
<p class="cta-title">Manage AI crawlers without editing theme code</p>
<p class="cta-desc">Nexis CRO lets you allow or block GPTBot, ClaudeBot, PerplexityBot, and more from one dashboard, with robots.txt rules synced to your policy.</p>
<a class="cta-btn" href="https://apps.shopify.com/nexis-cro-ai-seo-aeo-audit?utm_source=nexiscro&utm_medium=blog_bottom&utm_campaign=ai-bot-manager-shopify-robots-txt" target="_blank" rel="noopener noreferrer">Try AI Bot Manager Free</a>
<p class="cta-secondary">Free plan available · 1-Click Bot Policy Sync · No code required</p>
</div>

## FAQ

<dl class="faq">

<dt>Does Shopify block AI bots by default?</dt>
<dd>No. Add explicit Disallow rules in robots.txt.liquid to block specific user-agents.</dd>

<dt>Where do I edit robots.txt?</dt>
<dd>templates/robots.txt.liquid in your theme. Preserve Shopify's default Liquid loop.</dd>

<dt>Should I block GPTBot?</dt>
<dd>Most stores should not. Blocking training bots is a policy choice; blocking retrieval bots hurts AI shopping visibility.</dd>

<dt>Can Cloudflare override robots.txt?</dt>
<dd>Yes. Check CDN bot settings and response codes, not just robots.txt content.</dd>

</dl>
