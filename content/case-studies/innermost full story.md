# Innermost — Case Study
*Product Design Lead*  
*November 2025 – April 2026*

---

## The Bet

I've done week-long silent retreats at Buddhist monasteries. The experience is not subtle. After a few days of consistent practice with real structure, real silence, and real instruction rooted in traditional teaching, something shifts — a noticeable gap opens between what arrives in your mind and how you respond to it. Mental clarity that isn't vague or aspirational. It's specific and measurable in your own life. The effect gets more potent the more you understand what meditation actually is and why it works.

The retreats weren't expensive — I went to a monastery, so the cost was my time and the commitment of actually getting there. That's the point: it wasn't money that made the practice work. It was the weight of the commitment itself. You couldn't half-ass it. You showed up fully because you'd decided to show up fully before you even arrived.

I saw a gap for a specific person — someone who's tried structured mindfulness practice, suspects there's more depth available, and wants something that takes traditional teaching seriously rather than packaging it as background noise. I'd been sitting with this idea for two years before I found the moment to build it.

The financial mechanic came from the same observation. Commitment is free in apps, and free commitment isn't really commitment. I wanted to design a product where showing up meant something — where the decision to begin carried a little weight. Skin in the game isn't a growth hack. It's what turns a casual user into someone who actually shows up.

---

## Context

In November 2025, I got accepted into **World Build Labs Cohort 2** — a builder residency for teams shipping mini apps on World App, a platform then at 30M+ users. The cohort culminated in a demo day and live launch at **Devcon Buenos Aires**, one of the largest Ethereum conferences in the world.

I brought Innermost with me. Bringing a meditation app into a crypto-native residency was a deliberate bet — the World ID authentication meant every user was a verified unique human, which mattered for a product where people were competing for a shared prize pool. The platform was a practical fit for the mechanic.

I built Innermost with one developer I hired. Two people. No external funding. The entire product was built and shipped in the residency window.

The product: a pay-to-play meditation challenge. Users pay a small entry fee, meditate daily for 8 consecutive days, and earn points toward a monthly leaderboard. Top performers get paid out from the prize pool. Miss a day and you lose your entry fee — but you keep the points you've already earned, and they count toward the leaderboard. You pay again to re-enter the challenge.

---

## What We Built

### The Core Loop

```
Pay entry fee → Meditate daily (8 days) → Earn points → Compete on leaderboard → Top performers paid out monthly
```

Miss a day: that challenge attempt ends. Your entry fee is gone. Your earned points stay — they contribute to your monthly leaderboard position. Pay again to start a new attempt.

This is a positive sum experience. The points you earn are always yours. The challenge is what you're betting on.

### The Noble Eightfold Path as Product Design

The 8-day structure isn't arbitrary. Each day maps to one of the steps in Buddhism's Noble Eightfold Path — and the sessions escalate in length as you go:

| Day | Theme | Duration |
|-----|-------|----------|
| 1 | Right View | 10 min |
| 2 | Right Intention | 10 min |
| 3 | Right Speech | 10 min |
| 4 | Right Action | 20 min |
| 5 | Right Livelihood | 20 min |
| 6 | Right Effort | 20 min |
| 7 | Right Mindfulness | 30 min |
| 8 | Right Concentration | 30 min |

This wasn't a design flourish. The structure is the pedagogy. You don't meditate for the same amount of time every day — you build into it. The product earns your commitment gradually, and the naming gives each day meaning beyond "Day 4."

### The Scoring System

Points weren't just for showing up. We designed a quality layer:

- **No-pause multiplier:** Uninterrupted session = ×1.5 on that day's points.
- **On-time bonus:** Completing within 24h of day start = ×1.2.
- **Reflection depth:** Written reflection over 50 words = +5 pts. Over 100 words = +10 pts on top.
- **Consistency bonus:** Zero pauses across all 8 sessions = +30 pts.
- **Full completion bonus:** Complete all 8 days = +50 pts.
- **Max possible per challenge:** ~285 points (perfect execution). Realistic ceiling: 200–220.

The scoring incentivized quality of practice, not just attendance. You could game attendance. You couldn't easily game presence.

### The Aesthetic

The visual language was drawn from two references: the Thai forest tradition of meditation — monastery temples in dense jungle, dim and atmospheric — and immersive game design. The premise: instead of generic wellness UI, the product should feel like traveling into a mystical forest. You are on a meditation adventure. The environment pulls you out of your default pattern before the meditation even starts.

Dark temple interiors. Lush forest architecture. Translucent UI panels floating over the environment. Not clinical. Not pastel. The product should feel like you're entering something, not opening an app. The goal was to bring the texture of the monastery experience to someone sitting in their apartment — unfamiliar enough to shift your state, coherent enough to feel intentional.

---

## The Technical Build

**Stack:** Next.js 16, React 19, TypeScript, Prisma ORM, PostgreSQL, NextAuth v5, World ID / MiniKit SDK, TailwindCSS, shadcn/ui.

**Authentication:** World ID — sybil-resistant identity, meaning each user is a verified unique human. No fake accounts farming the leaderboard.

**Payments:** Native WLD payments via MiniKit's payment flow, verified on-chain before challenge access is granted.

**Backend:** 201 commits across 4 months. PostgreSQL via Prisma for meditation sessions, streaks, points, reflections, and leaderboard state. Deployed on Vercel.

I directed product, designed all screens, wrote specs, and managed scope. Architecture decisions were joint calls with my developer. The implementation was his.

---

## The Pivot: From Smart Contracts to Safe Multisig

The original plan was automated staking — smart contracts that would lock user funds, verify streaks on-chain, and distribute payouts automatically. Trustless. Scalable. The ideal version.

We got formal quotes for two paths:

**Option A — SimpleStakingUpgradeable**
- UUPS upgradeable ERC20 staking contract
- Development + testing + integration: ~$12K
- Security audit (recommended): $5K–$10K separately
- **Total estimated: $17K–$22K**

**Option B — MorphoSupplyProxy**
- More ambitious: funds deposited into Morpho Blue, earning yield while locked
- Development + testing + integration: ~$16.5K
- Security audit (recommended): $8K–$15K separately
- **Total estimated: $25K–$32K**

Neither was viable for a two-person team with no external funding. But walking away from smart contracts entirely would mean users had to trust us with their funds — no on-chain guarantee, just our word. That breaks the product's core promise.

**What we built instead:** A Safe multisig treasury. Safe is the industry-standard tool used by most serious DAOs — our own spec noted that the World Foundation uses it for their operations — and it gave us the same security properties we were trying to build with a custom contract, at a fraction of the cost.

```
User pays 0.1 WLD entry fee
         ↓
Payment Receiver (hot wallet, temporary holding)
         ↓ (daily batch transfer)
Safe Multisig Treasury (2-of-2 signatures required)
         ↓ (cron job runs on 1st of month)
Payout Script → generates CSV rankings → creates batch transaction
         ↓ (both of us approve)
Batch WLD distribution to all winners
         ↓
Users receive WLD in wallet + in-app notification
```

Same security (no single point of failure). Same transparency (on-chain audit trail). Operationally intensive — every monthly payout required two people to manually sign. But it worked, and we shipped it.

What the decision clarified: we needed users to be able to trust the payout. That was the requirement. Smart contracts were one way to achieve it. They weren't the only way.

---

## Launch

We launched at **Devcon Buenos Aires** in November 2025 at the World App demo booth. Innermost was demoed live as part of World Build Labs 2 demo day alongside teams backed by BCAP, Dragonfly, Circle, Alchemy, and others.

Peak WAU after launch: **314** (week of January 4, 2026).

First leaderboard and monetization shipped January 15, 2026. **7 players received their first payout.**

March 2026 brought a spike to **646 WAU** via a marketing push from the Richman app. The number fell back the following week — a traffic source, not an activation fix.

---

## What the Data Said

*All data from PostHog. Tracking period: November 29, 2025 – April 2026.*

### The Funnel

| Step | Users | Conversion |
|------|-------|------------|
| Home page | 2,148 | 100% |
| Challenge page | 1,356 | 63% |
| Session started | 639 | 30% |
| Reflection page | 93 | 4.3% |
| Day completed | 0 | 0%* |

*\*Almost certainly an instrumentation bug — top priority to investigate before V2 launch.*

### What this means, honestly

**37% never left the homepage.** Discovery wasn't working. The homepage wasn't communicating value fast enough to make people go deeper.

**Only 102 out of 1,992 people who logged in ever started a meditation session.** The average time from first login to first session: nearly 2 hours. Something between authentication and first session was bleeding everyone out.

**85% dropped between session started and reflection.** The reflection wasn't optional in the scoring system — it was required for full points. We designed depth. Users experienced friction.

**~85–90% never returned for Challenge Day 2.** The retention cliff was steep. Almost everyone who made it through Day 1 didn't come back.

### The two decisions the data forced

**Decision 1 — Notifications.** User feedback made it explicit: people didn't return because they forgot. And once they realized they'd missed a day, lost their entry fee, and would have to pay again to re-enter, they felt punished for being human. The product's financial mechanic — the core design — became the reason people left.

Notifications aren't a growth lever here. They're what makes the model fair.

**Decision 2 — Platform.** The World App platform was adding structural friction before users even reached the product. Authentication flow, platform discovery, the mini app container — all of it sat between the user and the meditation. Combined with the 2-hour average time to first session, the signal was clear: the platform was working against the product's core experience.

---

## What We Learned

**On platform-product fit.** World App is a great platform. It wasn't the right home for this product. The ecosystem attracts users looking for financial products, DeFi, and economic tools. A meditation game with small financial stakes didn't fit cleanly — and the structural friction the platform added made an already-difficult activation problem worse. Platform-product fit is as real as product-market fit. We learned it by shipping into the wrong one.

**On designing for commitment.** Commitment and completion aren't the same thing. Innermost was designed to create commitment — you paid, you have skin in the game. What we didn't design well enough was the path from committed to complete. The gap between Day 1 and Day 2 is where commitment turns into follow-through. That's a product problem, not a user problem.

**On the reflection mechanic.** The daily journal was both the most intentional part of the product and the biggest source of drop-off. We designed it as depth. Users experienced it as a gate. In V2, the relationship between reflection and points needs to be rethought — the practice should feel rewarding before it feels required.

**On working with a developer.** I learned how to read specs, push back on scope, and have real conversations about what's technically expensive versus what just sounds expensive. The difference between a feature that changes user behavior and a feature that changes the dashboard. That's a different kind of product education than designing in isolation.

---

## What's Next

The project is paused. The core thesis is still right — financial stakes create real commitment to practice. What needs to change is the implementation: out of the World App ecosystem, into a web app, and designed from the start with the notifications and onboarding it actually needs to be fair to users.

The V2 vision and the redesign are things I'm still working through. innermost.life will be the home when it comes back.

---

## Stack Reference

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 / React 19 |
| Language | TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth v5 + World ID (MiniKit) |
| Payments | World MiniKit payment flow |
| Treasury | Safe Multisig (2-of-2) |
| Styling | TailwindCSS + shadcn/ui |
| Analytics | PostHog |
| Deployment | Vercel |

---

*Innermost was built November 2025 – April 2026. Launched at Devcon Buenos Aires as part of World Build Labs Cohort 2.*
