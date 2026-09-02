# Nexis CRO — Landing Page

Marketing landing page for **Nexis: AI SEO & AEO Audit**, a Shopify app that audits storefronts for AI search engine readiness.

**Live**: [nexiscro.com](https://nexiscro.com)

## Tech Stack

- **[Astro](https://astro.build)** v5 — Static site generator with component islands
- **[Cloudflare Pages](https://pages.cloudflare.com)** — Edge deployment via `@astrojs/cloudflare`
- **Vanilla CSS** — Custom dark-first design system, no framework dependencies

## Design System

Dark-first cinematic theme inspired by [Shopify](../../design-systems/shopify/DESIGN.md) and [Linear](../../design-systems/linear-app/DESIGN.md) design systems from open-design.

| Token | Value | Role |
|-------|-------|------|
| `--bg-void` | `#000000` | Page background |
| `--bg-deep` | `#020a0c` | Card surfaces |
| `--bg-section` | `#061a1c` | Section backgrounds |
| `--accent` | `#36F4A4` | CTA highlights, focus rings |
| `--text-primary` | `#f7f8f8` | Headlines |
| `--text-secondary` | `#c8c8d0` | Body text |

**Typography**: Inter (display/body) + JetBrains Mono (scores, terminal)

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Base HTML, SEO meta, JSON-LD, fonts
├── styles/
│   └── global.css             # Design system tokens & utilities
├── components/
│   ├── Nav.astro              # Sticky nav, scroll bg transition
│   ├── Hero.astro             # Headline + animated AEO score card
│   ├── Problem.astro          # AI visibility story + platform cards
│   ├── Demo.astro             # Terminal-style audit simulation
│   ├── Features.astro         # 3×2 bento feature grid
│   ├── Pricing.astro          # 4-tier pricing (Free/Pro/Growth/Agency)
│   ├── FAQ.astro              # 7 collapsible Q&A (<details>)
│   ├── Contact.astro          # Contact form with email/subject/message
│   ├── CTA.astro              # Final call-to-action band
│   └── Footer.astro           # Brand, nav columns, legal links
├── pages/
│   └── index.astro            # Main page composing all sections
└── assets/
    └── icons/                 # SVG feature icons
```

## Page Sections

1. **Hero** — "Your store is invisible to AI search engines." + animated score counter
2. **Problem** — Split layout with ChatGPT/Perplexity/Google AI/Bing Copilot score cards
3. **Demo** — Interactive audit simulation with sequential terminal-style line reveals
4. **Features** — AI Quick Fix, Schema Blocks, llms.txt, AI Visibility, Benchmarking, Scheduled Audits
5. **Pricing** — Free / Pro ($9) / Growth ($21, recommended) / Agency ($44)
6. **FAQ** — 7 product-specific questions with native `<details>` (no JS)
7. **Contact** — Name/email/subject/message form + support info
8. **CTA** — Final conversion band with accent glow
9. **Footer** — Brand, product/resource/legal link columns

## Commands

| Command | Action |
|:--------|:-------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Deploy

Deployed to Cloudflare Pages via Wrangler:

```bash
npm run build
npx wrangler pages deploy dist/ --project-name nexis-landing
```

To connect a custom domain, go to **Cloudflare Dashboard → Pages → nexis-landing → Custom domains**.

## Design Principles

Follows open-design craft rules:

- **[Anti-AI-Slop](../../craft/anti-ai-slop.md)** — No default indigo, no emoji icons, no lorem ipsum, no generic hero patterns
- **[Laws of UX](../../craft/laws-of-ux.md)** — Hick's law (limited CTAs per viewport), Fitts's law (large touch targets), Von Restorff (Growth plan highlighted)
- **[SaaS Landing Skill](../../skills/saas-landing/SKILL.md)** — Section structure and `data-od-id` tagging
