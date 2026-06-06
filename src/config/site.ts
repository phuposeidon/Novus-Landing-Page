/**
 * Central link registry — only expose URLs that resolve today.
 * Add new entries here once the page or App Store listing exists.
 */
export const SHOPIFY_INSTALL_URL = "https://apps.shopify.com/partners/nexis-cro";

export const SUPPORT_EMAIL = "support@nexiscro.com";

/** Editorial byline + E-E-A-T author page (blog JSON-LD + /about). */
export const EDITORIAL_AUTHOR = {
  name: "Nexis CRO Editorial Team",
  path: "/about/",
  jobTitle: "Shopify AEO & AI SEO specialists",
  bio: "The Nexis CRO editorial team publishes practical guides on Answer Engine Optimization, llms.txt, schema markup, and AI citation tracking for Shopify merchants.",
} as const;

/** Public privacy policy (App Store + in-app legal card). */
export const PRIVACY_POLICY_URL = "https://nexiscro.com/privacy";

/** Marketing site contact form anchor. */
export const CONTACT_FORM_URL = "https://nexiscro.com/#contact";

/** Shopify App Store listing — screencast URL for reviewer testing instructions. */
export const APP_REVIEW_SCREENCAST_URL = "https://app.nexiscro.com/app-review/";

/** Root-relative hashes — work from any page (e.g. /privacy → /#features). */
export const siteAnchors = {
  features: "/#features",
  howItWorks: "/#how-it-works",
  pricing: "/#pricing",
  resources: "/#resources",
  faq: "/#faq",
  contact: "/#contact",
} as const;

/** Footer / nav links — omit entries until destination pages exist. */
export const BLOG_URL = "/blog";

export const footerProductLinks = [
  { label: "Features", href: siteAnchors.features },
  { label: "Pricing", href: siteAnchors.pricing },
  { label: "Blog", href: BLOG_URL },
  { label: "FAQ", href: siteAnchors.faq },
  { label: "Install on Shopify", href: SHOPIFY_INSTALL_URL, external: true },
] as const;

export const footerSupportLinks = [
  { label: "About editorial", href: EDITORIAL_AUTHOR.path },
  { label: "Contact", href: siteAnchors.contact },
  { label: "Email support", href: `mailto:${SUPPORT_EMAIL}`, external: true },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
] as const;
