/**
 * Case Study Data — Tessaverse
 *
 * Each case study maps to a project slug.
 * The [slug] page checks here first, falls back to projects.ts.
 *
 * To add a new case study:
 * 1. Copy the CaseStudy shape below
 * 2. Fill in each field
 * 3. Add to the caseStudies array
 * 4. Drop visuals into /public/images/tessaverse/[slug]/
 */

// ─── Types ────────────────────────────────────────────────

export interface VisualSlot {
  src: string;       // path from /public — e.g. /images/tessaverse/innermost/flow.png
  alt: string;
  caption?: string;
}

export interface StackRow {
  layer: string;
  technology: string;
}

export type FeatureBlock =
  | { type: 'text'; label: string; body: string }
  | { type: 'loop'; label: string; steps: string[] }
  | { type: 'table'; label: string; body?: string; headers: string[]; rows: (string | number)[][] }
  | { type: 'list'; label: string; body?: string; items: string[] }
  | { type: 'rule-list'; label: string; body?: string; items: string[] }  // borderless rows, no dash prefix
  | { type: 'visual'; label: string; body: string; visual: VisualSlot }
  | { type: 'text+visual'; label: string; body: string; visual: VisualSlot };

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;        // e.g. "a mindfulness mini app"
  role: string;            // e.g. "Product Design Lead"
  period: string;          // e.g. "November 2025 – April 2026"
  tags: string[];

  betLabel?: string;       // defaults to 'the bet'. set to 'the brief' etc. for different case studies

  bet: {
    body: string;          // 2–4 sentences. The problem / the insight.
    visual?: VisualSlot;
  };

  built: {
    body: string;          // What the product is. One tight paragraph.
    visual?: VisualSlot;
  };

  hideFeaturesLabel?: boolean; // hide the "features —" section wrapper label

  features: FeatureBlock[];

  stack?: StackRow[];      // omit or leave empty to hide the tech stack section

  fullStory?: {
    body: string;
    substackUrl?: string;  // set when live to show the CTA link
  };
}

// ─── Data ─────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: 'innermost',
    title: 'Innermost',
    subtitle: 'a mindfulness mini app',
    role: 'Product Design Lead',
    period: 'November 2025 – April 2026',
    tags: ['mini app', 'world app', 'creative direction', '0→1'],

    bet: {
      body: `Wellness apps solved for access, but the real problem was commitment.

We bet that a small financial stake would do what no streak ever could: **make you actually decide to show up.**`,
    },

    built: {
      body: `A meditation challenge with real stakes. Users pay a small entry fee in WLD, work through an 8-day structured program, and earn points based on the attendance and quality of their practice. Top performers each month earn a payout from the community pool.

Built with one developer and shipped at Devcon Buenos Aires as part of World Build Labs Cohort 2, a builder residency for World App's 30M+ user platform.`,
      visual: {
        src: '/images/tessaverse/innermost/innermost gameplay flow.png',
        alt: 'Innermost gameplay flow — entry fee through session complete',
      },
    },

    features: [
      {
        type: 'loop',
        label: 'core loop',
        steps: [
          'Pay entry fee',
          'Meditate daily (8 days)',
          'Earn points',
          'Compete on leaderboard',
          'Top performers paid out monthly',
        ],
      },
      {
        type: 'table',
        label: 'gameplay content',
        body: `The 8 days aren't arbitrary. Each maps to a step in Buddhism's Noble Eightfold Path, and sessions escalate in length as you progress. The structure is the pedagogy. You build into the practice. Each day has a name, not just a number.`,
        headers: ['Day', 'Theme', 'Session'],
        rows: [
          [1, 'Right View', '10 min'],
          [2, 'Right Intention', '10 min'],
          [3, 'Right Speech', '10 min'],
          [4, 'Right Action', '20 min'],
          [5, 'Right Livelihood', '20 min'],
          [6, 'Right Effort', '20 min'],
          [7, 'Right Mindfulness', '30 min'],
          [8, 'Right Concentration', '30 min'],
        ],
      },
      {
        type: 'visual',
        label: 'visual design',
        body: `Inspired by the Thai forest monastery tradition and immersive game design. The UI move away from the clinical interface and lives inside a dense, atmospheric temple environment. The goal was to **bring the feeling of entering a retreat into a phone screen, using unfamiliar visuals to break the user out of their default pattern** before the session even begins.`,
        visual: {
          src: '/images/tessaverse/innermost/innermost visual design.png',
          alt: 'Innermost visual design — Thai forest temple aesthetic with UI overlay',
        },
      },
      {
        type: 'rule-list',
        label: 'scoring system',
        body: 'Points reward showing up and quality of practice.',
        items: [
          'No-pause multiplier: ×1.5 on that session\'s points',
          'On-time bonus: ×1.2 for completing within 24h',
          'Reflection depth: +5 pts (50+ words) / +10 pts (100+ words)',
          'Consistency bonus: +30 pts for zero pauses across all 8 sessions',
          'Full completion bonus: +50 pts for finishing all 8 days',
          'Max per challenge: ~285 pts. Realistic ceiling: 200–220.',
        ],
      },
      {
        type: 'text+visual',
        label: 'leaderboard & community pool',
        body: `Entry fees flow into a monthly prize pool (80% to players, 20% to team). Points accumulate across multiple challenge attempts in a month. Payout is pro-rata based on total points: the more you practice, the larger your share.

Payouts were distributed via Safe multisig: a 2-of-2 treasury requiring both team members to sign off. We explored automated staking contracts (two formal quotes, two different architectures) and chose the approach that let us ship.`,
        visual: {
          src: '/images/tessaverse/innermost/innermost profile and leaderboard.png',
          alt: 'Innermost leaderboard — prize pool, rank, estimated payout',
        },
      },
    ],

    stack: [
      { layer: 'Framework', technology: 'Next.js 16 / React 19' },
      { layer: 'Language', technology: 'TypeScript' },
      { layer: 'Database', technology: 'PostgreSQL via Prisma ORM' },
      { layer: 'Auth', technology: 'NextAuth v5 + World ID (MiniKit)' },
      { layer: 'Payments', technology: 'World MiniKit' },
      { layer: 'Treasury', technology: 'Safe Multisig (2-of-2)' },
      { layer: 'Styling', technology: 'TailwindCSS + shadcn/ui' },
      { layer: 'Analytics', technology: 'PostHog' },
      { layer: 'Deployment', technology: 'Vercel' },
    ],

    fullStory: {
      body: `The complete build story — the staking pivot, PostHog data, what failed and why, and what I'd do differently — is on Substack. (coming soon)`,
      substackUrl: undefined, // replace with full URL once live
    },
  },
  {
    slug: 'edge-city-goods',
    title: 'Edge City Goods',
    subtitle: 'building the visual language for a popup archive store',
    role: 'Design Systems · Brand · UI/UX',
    period: '2024 – 2025',
    tags: ['e-commerce', 'fashion', 'branding', 'design systems'],

    betLabel: 'the brief',
    hideFeaturesLabel: true,

    bet: {
      body: `Edge City Goods is the official merch store for Edge City — a series of popup events for frontier builders, curious minds, and techno-optimists. Each drop represents a specific event. The store is an archive of experiences distilled into objects.

The store was live and working. The visual identity was strong. But it lived entirely in implicit knowledge — CSS comments, pattern recognition, institutional memory. No documentation. No system. Nothing that could scale to new platforms, new contributors, or AI-assisted development.

The goal: make the implicit explicit. Build a design system that could serve a web store, an iOS app, and a World mini app from a single source of truth.`,
    },

    built: {
      body: `A full design system for Edge City Goods — brand foundation, semantic color tokens, typography rules, glass surface hierarchy, motion patterns, and a 60+ component Figma library. Built to serve web, iOS, and a World mini app from one token file.

The system includes DESIGN.md — a plain-text spec written to be read by AI coding tools. Before it existed, AI-generated UI came back generic. After: on-brand, first pass.`,
      visual: {
        src: '/images/tessaverse/edge-city-goods/egde city goods homepage v2.jpg',
        alt: 'Edge City Goods homepage v2 — full design system applied',
      },
    },

    features: [
      {
        type: 'text',
        label: 'brand foundation',
        body: `The aesthetic isn't arbitrary. It traces back to a worldview.

Edge City lives at the intersection of Buckminster Fuller's systems thinking, the Whole Earth Catalog's democratized knowledge, and the counterculture conviction that small groups of high-agency people can bend trajectories. The store is a relic-maker. Objects that carry meaning because of what happened around them.

clouds → boundlessness, frontier, altitude above the default
glass → transparency, nothing hidden, weightless precision
float → unhurried, dreamy, slightly above everything
white on sky → restraint, light, doing more with less`,
      },
      {
        type: 'table',
        label: 'color',
        body: 'Seven semantic tokens. No raw values in components — ever. The most important rule: --color-accent is for interactive elements only. Links, buttons, active states. Never decorative. Any accent-colored element that isn\'t clickable is a violation.',
        headers: ['Token', 'Use'],
        rows: [
          ['--color-surface', 'Product cards, nav pill, cart panel (glass light)'],
          ['--color-surface-dark', 'Modals, overlays, size guide (glass dark)'],
          ['--color-surface-solid', 'Form inputs, focused states (glass solid)'],
          ['--color-text', 'All primary text'],
          ['--color-text-muted', 'Secondary labels, metadata'],
          ['--color-accent', 'Interactive elements only — links, buttons, active states'],
          ['--color-border', 'Standard borders'],
          ['--color-border-subtle', 'Dividers, quiet structure'],
        ],
      },
      {
        type: 'text',
        label: 'typography',
        body: `Two fonts. Strict roles. No overlap.

Instrument Serif italic → navigation and menu labels only. Always italic. The single expressive element in an otherwise minimal system.

Inter → everything else. Product titles, prices, descriptions, labels, policies. The workhorse.

The constraint is the point. When only one element is expressive, it carries more weight.`,
      },
      {
        type: 'table',
        label: 'surface hierarchy',
        body: 'Three levels of glass. Each has one job.',
        headers: ['Surface', 'Token', 'Use'],
        rows: [
          ['glass light', '--color-surface', 'product cards, nav pill, cart panel'],
          ['glass dark', '--color-surface-dark', 'modals, overlays, size guide'],
          ['glass solid', '--color-surface-solid', 'form inputs, focused states'],
        ],
      },
      {
        type: 'text',
        label: 'motion',
        body: `Two motion patterns define the brand feel.

float — product images drift -12px vertically on a 6s ease-in-out loop. Ambient, unhurried. Every floating element has a staggered delay so nothing moves in unison.

sibling dim — when one product is hovered, siblings drop to 70% opacity. The hovered item scales to 1.05× and rotates 1°. The effect pulls focus without hiding anything.

Both animations respect prefers-reduced-motion. No exceptions.`,
      },
      {
        type: 'text',
        label: 'the AI-native layer',
        body: `The system includes DESIGN.md — a plain-text file in the repo root written to be read by AI coding tools. Cursor, Claude Code, Copilot. Before this existed, AI-generated UI for the store came back generic: default shopify patterns, wrong fonts, raw rgba values, accent colors used decoratively.

After: AI sessions open with full design context. The right tokens, the right surface patterns, the right constraints. The gap between "AI-generated" and "on-brand" collapses.

This is the novel part of the workflow. The design system isn't just for humans.`,
      },
      {
        type: 'rule-list',
        label: 'cross-platform tokens',
        body: 'One tokens.json file serves three platforms via different translators. Change a token value once. Every platform updates.',
        items: [
          'web → CSS custom properties in app.css, consumed by Tailwind',
          'iOS → BrandTokens.swift — tokens mapped to SwiftUI Color, Material, Font, and Animation. Glass surfaces become native .ultraThinMaterial and .regularMaterial — better performance, better system integration',
          'world mini app → web tokens apply directly (WebView), with documented constraints: no hover states, single column only, safe area awareness',
        ],
      },
      {
        type: 'list',
        label: 'selected components',
        items: [
          'nav pill — the primary navigation lives in a single pill, fixed top-right. collapsed: cart count + expand button. expanded: all nav links in Instrument Serif italic + close. glass light surface.',
          'product card — image (1:1), title, price. no explicit card frame. the product floats free against the background. the grid hover pattern (sibling dim) is what makes it interactive.',
          'cart panel — glass light dropdown, attached to the nav pill. custom scrollbar. line items with product thumbnail, options, quantity, delete. subtotal + checkout button.',
          'size guide modal — the first production use of glassmorphic-dark. the contrast against the lighter product area creates hierarchy. everything behind it recedes. the overlay reinforces: this is a focused moment.',
        ],
      },
      {
        type: 'text',
        label: 'figma library',
        body: `60+ components across 10 build layers. Tokens imported via Tokens Studio — color variables, text styles, effect styles all derived from tokens.json. No manual re-entry of values.

Component naming convention: ComponentName / Variant / State
e.g. Button / Checkout / Hover, Option Selector / Size / Selected`,
      },
      {
        type: 'list',
        label: 'outcome',
        body: 'The store was already beautiful. The system makes it reproducible, scalable, and ready for whatever Edge City builds next.',
        items: [
          'a living brand document (BRAND.md) that any collaborator can read and understand the why behind every decision',
          'a developer-facing design spec (DESIGN.md) that AI tools read before writing any UI code',
          'a platform-agnostic token file that keeps web, iOS, and World mini app in sync',
          'a complete Figma library build checklist — every component, every variant, every state',
          'a reusable workflow (INSTRUCTIONS.md) that can reproduce this deliverable set for any new project in a single agent session',
        ],
      },
    ],

  },
];

// ─── Helpers ──────────────────────────────────────────────

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
