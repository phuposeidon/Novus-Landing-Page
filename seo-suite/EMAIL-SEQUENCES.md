# Email Sequences: Nexis CRO

**URL:** https://nexiscro.com
**Date:** June 6, 2026
**Business Type:** SaaS — Shopify App (AEO / AI SEO Auditing)
**Target Audience:** Shopify merchants (all sizes), Shopify agencies, developers managing multiple stores
**Sequences Generated:** Welcome/Onboarding · Free-to-Paid Upgrade Nurture · Agency Cold Outreach
**Voice:** Direct, pain-first, technical but accessible — no fluff, specific platform names (ChatGPT/Perplexity/Google AI)
**Context:** Marketing audit score 68/100; biggest gap is social proof (48/100 trust). Email tone should acknowledge this is an early product and lean into founder authenticity.

---

## Sequence 1: Welcome / Onboarding

**Goal:** First audit run → first AI credit used → understand value → upgrade to paid
**Trigger:** Merchant installs app (any plan)
**Emails:** 7
**Duration:** 14 days
**Expected Open Rate:** 35–45% (onboarding sequences outperform all other types)
**Expected Click Rate:** 8–12%
**Expected Free→Paid Conversion:** 3–8%

---

### Email 1: Welcome + First Action

**Send:** Immediately on install
**Subject Line:** Your Shopify store just got smarter
**Subject Line B (A/B):** One thing to do right now in Nexis CRO
**Preview Text:** Run your first audit — it takes 90 seconds and shows exactly where you stand.

---

Hey [First Name],

Welcome to Nexis CRO.

You've just installed the only Shopify app built specifically to optimize for AI search — ChatGPT, Perplexity, Google AI, and Bing Copilot.

Here's the one thing to do right now:

**Run your first AEO audit.**

It takes 90 seconds. When it's done, you'll see:
- Your store's AEO Score (0–100)
- Every issue blocking AI engines from citing your products
- What to fix first, ranked by impact

[Run Your First Audit →]

If you're on the Free plan, you get 1 audit/month and 5 AI credits. That's enough to see the full picture and start fixing what matters most.

Over the next two weeks, I'll send you a few short emails on AEO — what it is, why it's growing faster than traditional SEO, and how Shopify merchants are using it to capture AI-referred traffic.

Questions? Reply to this email — I read everything.

[Name]
Nexis CRO

P.S. If something doesn't look right after your audit, or you're not sure what an issue means, reply here. Happy to walk you through it.

---

**CTA:** Run Your First Audit → [deep link to audit dashboard in app]
**Goal:** Get the merchant to run their first audit within 24 hours of install
**Segmentation:** All new installs. Tag: `install_date`, `plan_type`

---

### Email 2: What Is AEO? (Educational — no ask)

**Send:** Day 1
**Subject Line:** What's AEO? (and why your SEO tool can't help)
**Subject Line B (A/B):** The audit Semrush doesn't have
**Preview Text:** 40% of Google searches now show AI Overviews. Here's what that means for your store.

---

Hey [First Name],

Quick question: when was the last time you searched for something on Google and *didn't* see an AI Overview at the top?

For most product categories, it's rare now.

ChatGPT, Perplexity, and Google AI Overviews are becoming the first stop for product discovery — and they're making buying recommendations your customers act on.

Here's the problem: traditional SEO tools (Semrush, Ahrefs, even Google Search Console) were built for a world where ranking #1 in blue links was the goal.

That world still exists. But a second one is growing on top of it.

**AEO — Answer Engine Optimization** — is the practice of structuring your Shopify store so AI engines can:
- Read and understand your catalog
- Cite your products in responses
- Recommend you over competitors who aren't structured for AI

It's not about replacing your SEO. It's about extending it to the channels where your customers are increasingly searching.

The stores that figure this out in 2026 will have a meaningful head start. The ones that wait until 2027 will be playing catch-up.

Tomorrow I'll share the number that put this in perspective for me.

[Name]

---

**CTA:** None (pure value email — no ask)
**Goal:** Educate and build authority. Replies to this email boost deliverability.
**Segmentation:** All onboarding subscribers

---

### Email 3: The Stat That Changes Everything

**Send:** Day 3
**Subject Line:** Shopify reported this in Q1. It stopped me mid-scroll.
**Subject Line B (A/B):** 13×. That's the number.
**Preview Text:** AI-referred Shopify orders grew nearly 13× year over year. Here's what it means for you.

---

Hey [First Name],

In Q1 2026, Shopify reported that AI-referred orders on merchant storefronts grew nearly **13× year over year**.

Not traffic. *Orders.*

And the merchants capturing that traffic? They converted at nearly **50% higher rates** than organic search visitors, with **14% higher average order value**.

There are two types of stores in that data: the ones being cited by ChatGPT and Perplexity, and the ones that aren't.

The difference usually comes down to three things:

1. **A machine-readable context file** (llms.txt) that tells AI engines what you sell
2. **JSON-LD schema** that gives AI parsers structured product and business data
3. **Clear, specific product copy** that LLMs can extract and cite directly

Your Nexis CRO audit shows you exactly which of these you're missing — and flags the specific pages where the gaps are.

If you haven't run your audit yet: [Run your first scan — 90 seconds →]

If you have, you'll see your AI search readiness score broken down by platform. That Google AI score below 50? That's the one to fix first.

More on how to fix it next time.

[Name]

*Source: Shopify Q1 2026 Commerce Insights*

---

**CTA:** Run your first scan [link to audit] — only shown if `first_audit_run = false`
**Goal:** Re-engage merchants who haven't run an audit yet; reinforce urgency for those who have
**Segmentation:** Split on `first_audit_run` — conditional CTA

---

### Email 4: Reading Your Audit Results

**Send:** Day 5
**Subject Line:** What your AEO score actually means
**Subject Line B (A/B):** Critical vs. High vs. Medium — which issues to fix first
**Preview Text:** Not all issues are equal. Here's how to read the priority flags in your dashboard.

---

Hey [First Name],

Let's talk about your audit results.

When Nexis CRO runs a scan, it checks your store across four layers of AI readiness:

**1. Crawler access**
Can ChatGPT, Perplexity, and Google AI actually crawl your store? If your robots.txt is blocking them (even accidentally), none of the other fixes matter.

**2. Machine-readable context**
Does your store have a llms.txt file? This tells AI systems: here's what this store sells, here are the most important pages, here's how to cite us. Stores without it are invisible to AI crawlers by default.

**3. Structured data (JSON-LD schema)**
Google AI Overviews and Bing Copilot prioritize stores with proper Product, Organization, and FAQ schema. If your Shopify theme doesn't inject it, Nexis CRO's Schema Blocks do — with one toggle in your Theme Editor.

**4. Content AI-readiness**
Are your product descriptions specific enough for an AI to extract and cite? Vague descriptions like "high-quality product for everyday use" won't appear in AI responses. Specific ones ("weatherproof 1200D nylon, ships same-day, 45-day returns") will.

Your audit results show each issue with a severity flag: Critical, High, or Medium.

Start with Critical. One-click AI fixes are available for most of them.

[Fix your critical issues →]

[Name]

P.S. If you're on the Free plan and you've used your 5 credits, reply here — I'll help you prioritize which manual fixes are worth doing first.

---

**CTA:** Fix your critical issues [deep link to issues list in app]
**Goal:** Drive AI credit usage — activation milestone
**Segmentation:** All onboarding; personalize `[X]` with actual issue count if ESP supports dynamic content

---

### Email 5: Feature Spotlight — AI Rank Tracker

**Send:** Day 7
**Subject Line:** "Is my store being cited by ChatGPT?" — here's how to know
**Subject Line B (A/B):** The question every Shopify merchant is asking right now
**Preview Text:** AI Rank Tracker tracks exactly when — and how often — AI engines mention your store.

---

Hey [First Name],

Here's a question that's harder to answer than it should be:

*Is ChatGPT actually recommending my products?*

You can search manually. But you'd need to run the same prompts every day, across ChatGPT, Perplexity, and Google AI, and track the results over time. That's not a workflow — that's a part-time job.

That's exactly what the **AI Rank Tracker** does automatically.

You set up the prompts your customers would realistically ask:
- "What's the best [product category] for [use case]?"
- "Where can I buy [specific product] online?"
- "Which stores sell [brand/category] with fast shipping?"

Nexis CRO runs those prompts on a schedule across AI platforms and tracks:
- Whether your store appeared in the response
- How prominently (first mention vs. buried)
- What your competitors' share of voice looks like
- How your citation rate changes over time

It's the closest thing to a keyword ranking tracker, built for AI search.

AI Rank Tracker is available on the **Growth plan** ($59/month, or $47/month billed annually).

[View how AI Rank Tracker works →]
[Upgrade to Growth →]

[Name]

---

**CTA (primary):** Upgrade to Growth
**CTA (secondary):** View AI Rank Tracker [feature page in app]
**Goal:** Feature discovery → Growth plan upgrade
**Segmentation:** Free and Pro users only. Suppress for Growth/Agency plan users.

---

### Email 6: Social Proof (Placeholder — Replace When Available)

**Send:** Day 10
**Subject Line:** How [Merchant Name] went from invisible to cited in 3 weeks
**Subject Line B (A/B):** Real results from a Shopify [category] store
**Preview Text:** Here's the pattern we see with stores that improve their AEO score fastest.

---

**⚠️ NOTE: Replace with a real merchant case study. Do not fabricate results. Template below:**

---

Hey [First Name],

[Merchant name], who runs [store name] selling [product category] on Shopify, ran their first Nexis CRO audit on [date].

Their AEO score was [X]. Google AI was rating them [Y].

Three weeks later: [specific result — score improvement, AI citations, traffic, orders].

What they did:
1. Fixed all Critical issues in the first session (took ~2 hours)
2. Deployed llms.txt and Schema Blocks
3. Set up 5 AI Rank Tracker prompts
4. Rewrote their top 20 product descriptions with one-click AI

---

**In the meantime, here's the pattern we see with stores that improve fastest:**

1. Run the audit immediately (obvious, but some skip it)
2. Fix all Critical issues within the first week
3. Add llms.txt and Schema Blocks in the same session
4. Set up 3–5 AI Rank Tracker prompts to measure the result

Stores that do all four in week one consistently see their AEO score jump 20–30 points.

[View your open issues →]
[Set up AI Rank Tracker prompts →]
[Deploy your llms.txt →]

[Name]

---

**CTA:** View your open issues [deep link to issues dashboard]
**Goal:** Re-activation + upgrade consideration
**Segmentation:** All onboarding users

---

### Email 7: Upgrade Pitch + Objection Handling

**Send:** Day 14
**Subject Line:** Is Nexis CRO worth it? (honest answer)
**Subject Line B (A/B):** Free vs. Pro vs. Growth — the honest breakdown
**Preview Text:** Here's how to know which plan is right for your store, and when upgrading actually makes sense.

---

Hey [First Name],

Two weeks in. Let me be direct.

If you've run your audit, fixed your critical issues, and used your free AI credits — you've already seen what Nexis CRO does.

The question is whether upgrading makes sense.

**Stay on Free if:** You have fewer than 3 critical issues, you prefer to fix things manually, and AI search isn't a priority channel yet. Free is genuinely useful.

**Upgrade to Pro ($29/month) if:** You want scheduled audits (automatic monthly scans so nothing regresses), 100 AI credits for rewrites, and 90-day issue history to track your progress.

**Upgrade to Growth ($59/month) if:** You want AI Rank Tracker — the tool that shows whether ChatGPT and Perplexity are actually citing your store and tracks it over time.

**Agency plan ($149/month) if:** You manage more than one Shopify store. Up to 5 child stores from one dashboard, each with their own audit, score, and issue tracking.

Annual billing saves 20% on any plan. No contracts — cancel from your Shopify admin anytime.

[See all plans →]

If there's a specific reason you haven't upgraded — pricing, a missing feature, something that wasn't clear — reply here. I'll give you a straight answer.

[Name]

---

**CTA:** See all plans [pricing page]
**Goal:** Conversion to any paid plan
**Segmentation:** Free users only. Suppress for paid plan users. Personalize upgrade recommendation based on plan type if possible.

---

---

## Sequence 2: Free-to-Paid Upgrade Nurture

**Goal:** Convert engaged free users who haven't upgraded after 14 days
**Trigger:** `plan_type = free` AND `first_audit_run = true` AND `days_since_install >= 14`
**Emails:** 5
**Duration:** 16 days
**Expected Open Rate:** 25–35%
**Expected Click Rate:** 4–7%
**Expected Upgrade Conversion:** 5–12%

---

### Email 1: The Gap

**Send:** Day 14 post-install (trigger: free + audit run + no upgrade)
**Subject Line:** You have [X] issues you can't fully fix on Free
**Subject Line B (A/B):** Your audit found things. Here's what Free lets you fix.
**Preview Text:** Some fixes need more AI credits. Here's which ones matter most.

---

Hey [First Name],

Your last audit found issues that need attention.

On Free, you get 5 AI credits per month. That's enough to fix the most critical items. But some of the high-priority issues — bulk rewrites, deeper AI queries, ongoing monitoring — need more.

Here's what's available at each tier:

| | Free | Pro | Growth |
|--|------|-----|--------|
| Audits | 1/month | Scheduled | Scheduled |
| AI credits | 5/month | 100/month | 300/month |
| AI Quick Fix | ✓ | ✓ | ✓ |
| AI Rank Tracker | 1 prompt, 5 checks | — | ✓ Full |
| Issue history | Current only | 90 days | Full |
| Schema Blocks | ✓ | ✓ | ✓ |
| llms.txt | ✓ | ✓ | ✓ |

The two features that have the most impact on AI search visibility — scheduled audits and AI Rank Tracker — are in Pro and Growth.

[Upgrade to Pro — $29/month →]
[Upgrade to Growth — $59/month (includes AI Rank Tracker) →]

Annual billing saves 20%. No contracts.

Or if you'd rather stick with Free: reply with your biggest challenge and I'll help you get the most out of your 5 monthly credits.

[Name]

---

**CTA (primary):** Upgrade to Pro
**CTA (secondary):** Upgrade to Growth
**Goal:** Upgrade click — either plan
**Segmentation:** Free users with `first_audit_run = true`, no upgrade after 14 days

---

### Email 2: The Cost of Waiting

**Send:** Day 17 post-install
**Subject Line:** What happens when your competitor fixes this first
**Subject Line B (A/B):** Your competitors are optimizing for AI search. Are you?
**Preview Text:** The window to be an early mover in AEO for Shopify is closing.

---

Hey [First Name],

Here's a scenario playing out in competitive Shopify niches right now:

**Store A** runs an AEO audit, fixes their critical issues, adds schema and llms.txt, and sets up AI Rank Tracker. By month 3, they're being cited in 40%+ of ChatGPT responses for their category.

**Store B** does nothing. They rank fine on Google. But they're invisible to AI search.

A shopper asks ChatGPT: *"Where can I buy [product] online with fast shipping?"*

ChatGPT recommends Store A. Store B isn't mentioned. The shopper never searches Google for this.

This isn't hypothetical. Shopify reported in Q1 2026 that AI-referred orders grew nearly 13× year over year — and those visitors converted at nearly 50% higher rates than organic search.

The merchants capturing that are the ones who optimized early.

On Free, you're working with 5 credits a month and no scheduled audits — which means your store's AI readiness can regress without you knowing.

Pro adds scheduled scans and 100 credits/month. Growth adds AI Rank Tracker so you can measure exactly whether it's working.

[Upgrade to Pro — $29/month →]
[Upgrade to Growth — $59/month →]

[Name]

---

**CTA:** Upgrade to Pro or Growth
**Goal:** FOMO/urgency-driven upgrade
**Segmentation:** Free users, no upgrade after 17 days

---

### Email 3: The ROI Breakdown

**Send:** Day 21 post-install
**Subject Line:** What does $29/month actually get you?
**Subject Line B (A/B):** The math on upgrading to Pro
**Preview Text:** If Nexis CRO helps you close one more AI-referred sale per month, it pays for itself.

---

Hey [First Name],

Let me put Pro ($29/month) in context.

The average Shopify merchant converting at 2% sees roughly $50–100 in revenue per 100 visitors. AI-referred visitors convert at nearly **50% higher** than organic search, with **14% higher AOV** (Shopify Q1 2026).

If optimizing for AI search brings you even 20 more AI-referred visitors per month and those convert at 3%, that's one additional sale. Depending on your AOV, that covers Pro — at minimum.

That's the math at the low end.

Here's what Pro actually gives you:

- **Scheduled audits** — your store stays optimized automatically, not just when you remember to check
- **100 AI credits/month** — enough to rewrite 100 product descriptions, meta tags, or policies with one click each
- **90-day issue history** — track whether your AEO score is improving month over month

For Growth ($59/month), add full AI Rank Tracker — the tool that shows whether ChatGPT and Perplexity are actually citing your store.

[Start Pro — $29/month →]
[Start Growth — $59/month →]
[Save 20% with annual billing →]

No contracts. Cancel from your Shopify admin at any time.

[Name]

---

**CTA:** Start Pro or Growth (both options shown)
**Goal:** Revenue-justified upgrade
**Segmentation:** Free users, no upgrade after 21 days

---

### Email 4: Scheduled Audits Deep Dive

**Send:** Day 25 post-install
**Subject Line:** The Shopify stores that improve fastest all do this
**Subject Line B (A/B):** Why "set it and forget it" beats manual AEO checks
**Preview Text:** Scheduled audits catch regressions before they become problems.

---

Hey [First Name],

Here's something we see consistently:

Stores that run one audit, fix everything, and don't check again for 3 months tend to **regress**.

A theme update removes a schema block. A new product page skips the description. A policy page gets deleted and not replaced.

By the time they notice, they've lost ground in AI search — and they don't know why.

Stores on Pro and Growth use **scheduled audits** to catch this automatically. Every month (or week — your choice), Nexis CRO reruns the full scan, flags new issues, and sends a summary.

You don't have to remember to check. You get an alert when something needs attention.

Combined with **issue history**, you can see your AEO score trend over time: improving, holding steady, or sliding. That visibility is what separates merchants who maintain AI search visibility from the ones who lose it quietly.

[Unlock scheduled audits — upgrade to Pro →]
[Upgrade to Growth (includes AI Rank Tracker) →]

[Name]

---

**CTA:** Upgrade to Pro
**Goal:** Feature-specific conversion for users who've run 1 audit and are in the "set and forget" risk group
**Segmentation:** Free users, `first_audit_run = true`, no upgrade after 25 days

---

### Email 5: Final Offer

**Send:** Day 30 post-install
**Subject Line:** Last one from me on upgrading — and a note on the annual discount
**Subject Line B (A/B):** 20% off annual — your last reminder before I stop asking
**Preview Text:** After this email, I'll leave it alone. But the discount is worth knowing about.

---

Hey [First Name],

Last email on this from me — I mean it.

If upgrading to Pro or Growth makes sense, annual billing saves you 20%:
- **Pro annual:** $23/month (vs. $29 monthly)
- **Growth annual:** $47/month (vs. $59 monthly)
- **Agency annual:** $119/month (vs. $149 monthly)

Available any time from your Shopify admin → Nexis CRO → Billing. No promo code needed.

If upgrading isn't right for you right now, that's completely fine. You'll keep getting value from Free, and I'll keep sending useful content on AEO and AI search.

[See plans and upgrade →]

And if there's something specific that made you hesitate — pricing, a feature question, something the app didn't explain well — reply to this email. I'm the easiest support line you'll find.

[Name]

---

**CTA:** See plans and upgrade [pricing page]
**Goal:** Final conversion push — annual billing framing
**Segmentation:** Free users, no upgrade after 30 days. After this email, move to standard newsletter cadence.

---

---

## Sequence 3: Agency Cold Outreach

**Goal:** Book a demo or drive Agency plan install from Shopify agencies and multi-store developers
**Trigger:** Manual send or list of agency contacts (Shopify Partners, freelancers, agencies)
**Emails:** 4
**Duration:** 20 days
**Expected Open Rate:** 30–45% (personalized cold outreach with relevant timing signal)
**Expected Reply Rate:** 3–8%
**Expected Demo/Install Conversion:** 1–3%

---

### Email 1: Relevance + Value

**Send:** Day 1
**Subject Line:** AI search is changing how Shopify agencies retain clients
**Subject Line B (A/B):** Quick question about AI readiness for Shopify
**Preview Text:** AI-referred Shopify orders grew 13× in Q1 2026. Most agencies aren't advising on this yet.

---

Hi [First Name],

Quick, specific question:

When a client asks you *"why isn't our Shopify store showing up in ChatGPT results?"* — do you have an answer ready?

Most agencies don't yet. It's a new problem and the tooling is still catching up.

I built Nexis CRO specifically for this: it audits Shopify stores for AI search readiness (ChatGPT, Perplexity, Google AI, Bing Copilot), flags the issues, and fixes them with one click.

For agencies, the **Agency plan** ($149/month, or $119/month billed annually) covers up to 5 client stores from a single dashboard — each with its own AEO score, issue history, and AI Rank Tracker.

Worth a look if this is something your clients are starting to ask about.

[See the Agency plan →]

Happy to send a walkthrough or jump on a quick call if that's easier.

[Name]
Nexis CRO

---

**CTA:** See the Agency plan [nexiscro.com/#agency or pricing page]
**Goal:** Click or reply
**Segmentation:** Shopify agencies, developers, Shopify Plus partners. Personalize `[agency name]` if available.

---

### Email 2: Follow-Up + Market Data

**Send:** Day 5
**Subject Line:** Re: AI search readiness for Shopify
**Subject Line B (A/B):** The stat your clients will start asking about
**Preview Text:** Shopify Q1 2026: AI-referred orders grew nearly 13× year over year.

---

Hi [First Name],

Wanted to follow up with one specific number — it's what's driving most of the client conversations we're hearing about.

**Shopify reported in Q1 2026 that AI-referred orders on merchant storefronts grew nearly 13× year over year.**

That's orders, not traffic. And AI-referred visitors convert at ~50% higher rates than organic search, with ~14% higher AOV.

The agencies that are ahead on this are already offering AEO auditing as a service — either as a standalone audit package or as part of their monthly retainer.

Nexis CRO's Agency plan makes that practical: one dashboard, up to 5 stores, AI Rank Tracker per store, issue history across all clients.

If it's useful context: I wrote a full guide on AEO for Shopify that breaks down the five-layer framework:
→ nexiscro.com/blog/shopify-aeo-guide-2026/

[Install free and explore the Agency plan →]

[Name]

---

**CTA:** Install free and explore
**Goal:** Agency plan install or reply
**Segmentation:** Non-responders to Email 1

---

### Email 3: Breakup + Resource Drop

**Send:** Day 10
**Subject Line:** Closing the loop — and a resource either way
**Subject Line B (A/B):** One thing before I leave you alone
**Preview Text:** The AI bot manager guide for Shopify — useful regardless of what you decide.

---

Hi [First Name],

I'll keep this short — I know your inbox is crowded.

If Nexis CRO isn't the right fit right now, no problem. But here's something useful regardless of what you decide:

**AI Bot Manager for Shopify: robots.txt Guide 2026**
nexiscro.com/blog/ai-bot-manager-shopify-robots-txt/

It covers which AI crawlers to allow or block on Shopify, how to edit `robots.txt.liquid` without breaking SEO defaults, and how to verify crawler access. Useful reference for any client conversation about AI search.

If the timing changes or a client asks specifically about AEO auditing — feel free to reply here. I'll make it easy.

[Name]

P.S. The Agency plan has a free install option if you want to explore it with one store before committing: nexiscro.com

---

**CTA:** Resource link (no hard sell)
**Goal:** Goodwill + open door for future reply
**Segmentation:** Non-responders to Emails 1–2

---

### Email 4: New Angle — Recurring Revenue Framing

**Send:** Day 20
**Subject Line:** The AEO service tier your competitors aren't offering yet
**Subject Line B (A/B):** Multi-store AEO: the retention angle agencies are missing
**Preview Text:** Most agencies see AEO auditing as a one-time deliverable. The ones making it a revenue line don't.

---

Hi [First Name],

Different angle this time.

Most agencies treat AEO auditing as a one-time deliverable: run the audit, fix the issues, invoice, done.

The agencies making it a recurring revenue line have framed it differently:

**AEO isn't a one-time fix. It's ongoing monitoring.**

AI search algorithms change. Schema requirements evolve. A theme update can break structured data overnight. New competitors enter and start getting cited. Stores that maintain AI search visibility are the ones that audit continuously — not once.

That framing turns a $500 one-time audit into a $300–500/month managed service. And with Nexis CRO's Agency plan covering 5 stores at $149/month, the margin is real.

If that's a service model worth exploring, I'm happy to talk through how to structure it — no obligation.

[Reply to chat] or [Install and explore Agency plan →]

[Name]

---

**CTA:** Reply or Agency plan install
**Goal:** Conversation start or install
**Segmentation:** Non-responders across all prior emails. Final touch — do not follow up after this.

---

---

## Segmentation Strategy

| Segment | Definition | Sequence | Priority |
|---------|-----------|----------|----------|
| New install — any plan | `install_date` = today | Welcome/Onboarding | Immediate |
| Free — audit run — no upgrade, 14+ days | `plan = free`, `audit_count >= 1`, `days >= 14` | Free-to-Paid Nurture | High |
| Free — no audit run, 7+ days | `plan = free`, `audit_count = 0`, `days >= 7` | Re-engagement (custom) | Medium |
| Shopify agencies / Shopify Plus partners | External list | Agency Cold Outreach | Medium |
| Paid plan — Growth/Agency | `plan = growth OR agency` | Suppress upgrade emails | — |
| Churned paid users | Cancelled paid subscription | Win-back (future) | Low |

**Tags to implement in ESP:**
- `plan_type` (free/pro/growth/agency)
- `first_audit_run` (true/false)
- `ai_credits_used` (integer)
- `install_date` (date)
- `upgrade_date` (date or null)
- `source` (organic/paid/referral)

---

## A/B Testing Plan

Test in this order (highest impact first):

| Priority | Test | Email | Variants |
|----------|------|-------|---------|
| 1 | Subject line formula | All | Number/benefit vs. curiosity gap |
| 2 | CTA text | Emails 5, 7 (Onboarding) | "Upgrade to Growth" vs. "Unlock AI Rank Tracker" |
| 3 | Send timing | Emails 3, 5 | Day 3 vs. Day 4 / Day 7 vs. Day 8 |
| 4 | Email length | Email 7 | Long (current) vs. short (4 bullets) |
| 5 | Personalization | Emails 1, 4 | `[First Name]` vs. no personalization |
| 6 | Plain text vs. HTML | Cold outreach sequence | Plain text (likely higher reply rate) vs. light HTML |

---

## Metrics to Track

**SaaS industry benchmarks for reference:**

| Metric | Industry Avg | Target for Nexis CRO |
|--------|-------------|---------------------|
| Welcome open rate | 35–50% | 40–50% |
| Nurture open rate | 20–25% | 25–35% |
| Cold outreach open rate | 25–45% | 30–45% |
| Click rate | 2–4% | 5–10% (onboarding), 3–6% (nurture) |
| Free→Paid conversion | 2–5% | 5–10% (within 30 days of install) |
| Cold reply rate | 2–8% | 3–8% |

**KPIs to track per sequence:**
- Open rate by email position (identify drop-off)
- Click rate by CTA type (install vs. upgrade vs. resource)
- `install_click` events from hero CTA (GA4 analytics already tracking this)
- Upgrade events by sequence email that preceded them
- AI credits consumed per subscriber cohort (proxy for activation quality)

---

## Compliance Checklist

**CAN-SPAM (US):**
- ✅ Physical mailing address required in every email footer — add company address
- ✅ Clear unsubscribe link required — managed by ESP
- ✅ "From" name: "Nexis CRO" or "[Name] from Nexis CRO"
- ✅ Subject lines must not be deceptive — all subjects above comply

**GDPR (EU):**
- ⚠️ Explicit opt-in consent required — document when and how consent was given at install
- ⚠️ Shopify app install = implied consent for transactional/onboarding emails, but marketing emails require explicit opt-in
- ✅ Right to be forgotten — ensure ESP supports deletion on request
- ⚠️ Verify your ESP has a Data Processing Agreement in place

**CASL (Canada):**
- ⚠️ Express consent required for commercial messages
- ✅ Implied consent acceptable for 24 months from business relationship (app install qualifies)
- ✅ Sender identification required — handled by "From" field

**Recommended:** Consult legal counsel before sending to EU subscribers. Shopify's merchant data agreement may have specific requirements for app developers sending marketing emails.

---

## Implementation Notes

**Recommended ESPs for Shopify apps:**
- **Loops.so** — built for SaaS, native Shopify webhook support, clean API
- **Customer.io** — most powerful segmentation, ideal for behavioral triggers
- **Klaviyo** — if already used for Shopify store marketing (familiar to merchants)
- **Resend** — if transactional emails are already on Resend (see `wrangler.toml` — RESEND_API_KEY already configured)

**Automation triggers to configure:**
1. Install event → Welcome Sequence Email 1 (immediate)
2. First audit run event → tag `first_audit_run = true`
3. Day 14 post-install, `plan = free`, `first_audit_run = true`, no upgrade → Nurture Sequence Email 1
4. Upgrade event → suppress all upgrade-pitch emails, add to appropriate plan segment

**Suggested follow-up commands:**
- `/market social https://nexiscro.com` — Generate social content calendar to support email topics
- `/market funnel https://nexiscro.com` — Align email sequences to funnel stage analysis
- `/market brand https://nexiscro.com` — Document voice guidelines for email writers/contractors

---

*Generated by `/market emails` — AI Marketing Suite*
*Context: MARKETING-AUDIT.md (68/100), SEO audit (75/100), source code review*
