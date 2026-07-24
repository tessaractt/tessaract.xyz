# Innermost
**Product Design Lead · November 2025 – April 2026**  
Mini app · Wellness · World App Platform

[visual placeholder: Innermost banner — dark temple environment with app UI overlay, full-width hero]

---

## The Bet

Most wellness apps make commitment free. Free commitment isn't really commitment.

Innermost is a pay-to-play meditation game. You stake a small entry fee, meditate daily for 8 days, and compete for a monthly prize pool. Miss a day and you lose your entry — but you keep your points and stay on the leaderboard. The financial stake is small. The behavioral effect is real.

I built this after years of doing silent retreats at Buddhist monasteries and noticing what actually makes a practice stick: not the right app, but the weight of having decided to show up.

---

## What We Built

A meditation challenge with real stakes. Users pay a small entry fee in WLD, work through an 8-day structured program rooted in traditional Buddhist teaching, and earn points based on the quality of their practice — not just attendance. Top performers each month earn a payout from the community pool.

Built with one developer and shipped at **Devcon Buenos Aires** as part of **World Build Labs Cohort 2**, a builder residency for World App's 30M+ user platform.

[visual placeholder: full gameplay flow diagram — entry fee screen → onboarding → meditation session → reflection → day complete → home screen]

---

## Features

### Core Loop

```
Pay entry → Meditate daily → Earn points → Leaderboard → Top performers paid out
```

Miss a day: that attempt ends, entry fee is gone. Your earned points stay — they always count toward the leaderboard. Pay again to start a new attempt. This is a positive sum experience.

---

### Gameplay Content — The Noble Eightfold Path

The 8 days aren't arbitrary. Each maps to a step in Buddhism's Noble Eightfold Path, with sessions that escalate in length as you progress.

| Day | Theme | Session |
|-----|-------|---------|
| 1 | Right View | 10 min |
| 2 | Right Intention | 10 min |
| 3 | Right Speech | 10 min |
| 4 | Right Action | 20 min |
| 5 | Right Livelihood | 20 min |
| 6 | Right Effort | 20 min |
| 7 | Right Mindfulness | 30 min |
| 8 | Right Concentration | 30 min |

The structure is the pedagogy. You build into the practice. Each day has a name, not just a number.

---

### Visual Design

[visual placeholder: 2–3 app screens showing the dark temple aesthetic — meditation session screen with forest environment background, translucent UI panel, START button]

Inspired by the Thai forest monastery tradition and immersive game design. The UI lives inside a dense, atmospheric temple environment — not a clinical wellness interface. The goal was to bring the feeling of entering a retreat into a phone screen, using unfamiliar visuals to break the user out of their default pattern before the session even begins.

---

### Scoring System

Points reward quality of practice, not just showing up.

- No-pause multiplier: ×1.5 on that session's points
- On-time bonus: ×1.2 for completing within 24h
- Reflection depth: +5 pts (50+ words) / +10 pts (100+ words)
- Consistency bonus: +30 pts for zero pauses across all 8 sessions
- Full completion bonus: +50 pts for finishing all 8 days
- **Max per challenge: ~285 pts. Realistic ceiling: 200–220.**

The scoring incentivized quality of practice, not just attendance. You could game attendance. You couldn't easily game presence.

---

### Leaderboard & Community Pool

[visual placeholder: leaderboard screen — prize pool amount, rank, estimated payout, player table with points]

Entry fees flow into a monthly prize pool (80% to players, 20% to team). Points accumulate across multiple challenge attempts in a month. Payout is pro-rata based on total points — the more you practice, the larger your share.

Payouts were distributed via **Safe multisig** — a 2-of-2 treasury requiring both team members to sign off. Same security properties as a smart contract, without the $17K–$32K audit cost. We explored automated staking contracts (two formal quotes, two different architectures) and chose the approach that let us ship.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 / React 19 |
| Language | TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth v5 + World ID (MiniKit) |
| Payments | World MiniKit |
| Treasury | Safe Multisig (2-of-2) |
| Styling | TailwindCSS + shadcn/ui |
| Analytics | PostHog |
| Deployment | Vercel |

---

## Full Story

The complete build story — the staking pivot, PostHog data, what failed and why, and what I'd do differently — is on Substack.

[→ Read the full case study on Substack](#)
