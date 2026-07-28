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

export interface TypeRole {
  role: string;
  specs: string;
  example: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  fontStyle?: 'italic' | 'normal';
  textTransform?: 'uppercase' | 'none';
  lineHeight?: number;
  letterSpacing?: string;
}

export interface ColorToken {
  token: string;
  value: string;
  swatch: string;
  use: string;
}

export type FeatureBlock =
  | { type: 'text'; label: string; body: string; centered?: boolean; noDash?: boolean; noTight?: boolean }
  | { type: 'loop'; label: string; steps: string[] }
  | { type: 'table'; label: string; body?: string; headers: string[]; rows: (string | number)[][] }
  | { type: 'list'; label: string; body?: string; items: string[]; centered?: boolean; noDash?: boolean }
  | { type: 'rule-list'; label: string; body?: string; items: string[]; centered?: boolean; noDash?: boolean; leftAlign?: boolean }
  | { type: 'color-cards'; label: string; body?: string; centered?: boolean; noDash?: boolean; tokens: ColorToken[] }
  | { type: 'type-scale'; label: string; body?: string; centered?: boolean; noDash?: boolean; roles: TypeRole[] }
  | { type: 'surface-demo'; label: string; body?: string; centered?: boolean; noDash?: boolean }
  | { type: 'motion-demo'; label: string; centered?: boolean; noDash?: boolean }
  | { type: 'component-kit-demo'; label: string; body?: string; centered?: boolean; noDash?: boolean }
  | { type: 'visual-diff-demo'; label: string; centered?: boolean; noDash?: boolean }
  | { type: 'llms-pipeline-demo'; label: string; centered?: boolean; noDash?: boolean }
  | { type: 'json-ld-demo'; label: string; centered?: boolean; noDash?: boolean }
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
    subtitle: 'a design system and AI-native commerce layer for a popup archive store',
    role: 'Design Systems · Brand · UI/UX',
    period: '2025 – present',
    tags: ['design systems', 'AI-native', 'e-commerce', 'brand strategy'],

    betLabel: 'the brief',
    hideFeaturesLabel: true,

    bet: {
      body: `A store with no system is a store that can't scale, can't hand off, and can't be touched by AI tools without breaking. Every hour a developer spends guessing your design intent is money wasted. Every AI tool that can't find your store is a sale that went somewhere else.

Edge City Goods had the aesthetic. What it didn't have was a system — or discoverability. We built both.`,
    },

    built: {
      body: `A complete design system and AI-native commerce layer for goods.edgecity.live. Documented in real-time as we built, not written up after the fact.

Two deliverables. One goal: a store that any developer can build on, any AI agent can find, and that doesn't depend on you to keep running.`,
      visual: {
        src: '/images/tessaverse/edge-city-goods/egde city goods homepage v2.jpg',
        alt: 'Edge City Goods homepage v2 — full design system applied',
      },
    },

    features: [
      {
        type: 'text',
        label: 'DESIGN.md — saves time. saves money.',
        body: `DESIGN.md is a plain-text spec in the repo root written to be read by AI coding tools — Cursor, Claude Code, Copilot. Every token, every surface rule, every Do/Don't.

Before it existed: AI-generated UI came back generic. Default Shopify patterns. Wrong fonts. Raw rgba values. Accent colors used decoratively.

After: AI sessions open with full design context. Right tokens. Right patterns. Right constraints. The gap between "AI-generated" and "on-brand" collapses on the first pass.

This is what turns a design system from documentation into infrastructure. It doesn't just tell humans what to build — it tells the tools.`,
      },
      {
        type: 'visual-diff-demo',
        label: '',
        centered: true,
        noDash: true,
      },
      {
        type: 'text',
        label: 'brand foundation',
        body: `The aesthetic isn't arbitrary. It traces back to a worldview.

Edge City lives at the intersection of Buckminster Fuller's systems thinking, the Whole Earth Catalog's democratized knowledge, and the conviction that small groups of high-agency people can bend trajectories. The store is a relic-maker — objects that carry meaning because of what happened around them.

clouds → boundlessness, frontier, altitude above the default
glass → transparency, nothing hidden, weightless precision
float → unhurried, dreamy, slightly above everything
white on sky → restraint, doing more with less`,
      },
      {
        type: 'color-cards',
        label: 'color',
        centered: true,
        noDash: true,
        body: 'Semantic tokens. No raw values in components — ever. --color-accent is for interactive elements only. Any accent-colored element that isn\'t clickable is a violation.',
        tokens: [
          { token: '--color-surface', value: 'rgba(255,255,255,0.15)', swatch: 'rgba(255,255,255,0.15)', use: 'Product cards, nav pill, cart panel.' },
          { token: '--color-surface-dark', value: 'rgba(0,0,0,0.35)', swatch: 'rgba(0,0,0,0.35)', use: 'Modals, overlays, size guide.' },
          { token: '--color-surface-solid', value: 'rgba(255,255,255,0.80)', swatch: 'rgba(255,255,255,0.80)', use: 'Form inputs, focused states.' },
          { token: '--color-text', value: '#ffffff', swatch: '#ffffff', use: 'All primary text.' },
          { token: '--color-text-muted', value: 'rgba(255,255,255,0.50)', swatch: 'rgba(255,255,255,0.50)', use: 'Secondary labels, metadata.' },
          { token: '--color-accent', value: 'rgba(255,255,255,0.80)', swatch: 'rgba(255,255,255,0.80)', use: 'Interactive elements only — never decorative.' },
          { token: '--color-border', value: 'rgba(255,255,255,0.20)', swatch: 'rgba(255,255,255,0.20)', use: 'Standard borders on glass surfaces.' },
          { token: '--color-border-subtle', value: 'rgba(255,255,255,0.10)', swatch: 'rgba(255,255,255,0.10)', use: 'Dividers, quiet structure.' },
        ],
      },
      {
        type: 'type-scale',
        label: 'typography',
        centered: true,
        noDash: true,
        body: `Two fonts. Strict roles. No overlap.\n\nInstrument Serif italic → navigation and menu labels only. Always italic. The single expressive element in an otherwise minimal system.\n\nInter → everything else. Product titles, prices, descriptions, labels, policies. The workhorse.\n\nThe constraint is the point. When only one element is expressive, it carries more weight.`,
        roles: [
          { role: 'page-title', specs: '2.5rem / 500 / 1.0 / uppercase', example: 'Edge City Goods', fontFamily: 'Inter, sans-serif', fontSize: '2.5rem', fontWeight: 500, textTransform: 'uppercase', lineHeight: 1.0 },
          { role: 'product-title', specs: '1.25rem / 500 / 1.3', example: 'Esmeralda 2026 Tee', fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3 },
          { role: 'product-price', specs: '0.875rem / 400 / 1.4', example: '$45.00', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.4 },
          { role: 'nav-label', specs: '1rem / 400 / 1.0 / italic', example: 'Shop · Archive · About', fontFamily: '"Instrument Serif", serif', fontSize: '1rem', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.0 },
          { role: 'body', specs: '1rem / 400 / 1.6', example: 'Objects that carry meaning because of what happened around them.', fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
          { role: 'body-sm', specs: '0.875rem / 400 / 1.5', example: "Limited. When it's gone, it's gone.", fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
          { role: 'label', specs: '0.75rem / 500 / 1.0 / uppercase / 0.08em', example: 'New Drop · Esmeralda 2026', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '0.08em' },
        ],
      },
      {
        type: 'surface-demo',
        label: 'surface hierarchy',
        centered: true,
        noDash: true,
        body: `Every surface in the store is one of three glass levels. Naming them as tokens means no raw rgba values in component code — any developer or AI tool knows exactly which surface to reach for without guessing.`,
      },
      {
        type: 'motion-demo',
        label: 'motion',
        centered: true,
        noDash: true,
      },
      {
        type: 'rule-list',
        label: 'cross-platform tokens',
        centered: true,
        noDash: true,
        body: 'One tokens.json file. Two platforms. Change a value once — web store and iOS app stay in sync.',
        items: [
          'web → CSS custom properties in app.css, consumed by Tailwind',
          'iOS → BrandTokens.swift — glass surfaces become native .ultraThinMaterial and .regularMaterial. better performance, better system integration',
        ],
      },
      {
        type: 'component-kit-demo',
        label: 'selected components',
        centered: true,
        noDash: true,
        body: 'Full component library in Figma, tokens synced via Tokens Studio — no manual re-entry. A few examples:',
      },
      {
        type: 'text',
        label: '',
        noTight: true,
        body: `Figma is one path. But because DESIGN.md fully specifies every token, surface rule, and interaction pattern, an AI agent can build components directly from the spec — to the same standard, without opening a design file. Every interactive component in this case study was built that way: DESIGN.md as the brief, Claude as the builder.`,
      },
      {
        type: 'text',
        label: 'the AI-native commerce layer — increase visibility.',
        body: `AI-mediated shopping is growing. When someone asks Claude or Perplexity "where do I get Edge City merch?" — you need to be the answer. This layer makes that possible.`,
      },
      {
        type: 'text',
        label: '',
        body: `**llms.txt + llms-full.txt** — the emerging standard for LLM discoverability. Every product, every page, in plain language. Crawled by Claude, Perplexity, and others automatically.`,
      },
      {
        type: 'llms-pipeline-demo',
        label: '',
        centered: true,
        noDash: true,
      },
      {
        type: 'text',
        label: '',
        noTight: true,
        body: `**JSON-LD Schema.org markup** — structured product data auto-generated from live Shopify data. Every product, including future ones, marked up correctly without touching the code again.`,
      },
      {
        type: 'json-ld-demo',
        label: '',
        centered: true,
        noDash: true,
      },
      {
        type: 'text',
        label: '',
        noTight: true,
        body: `**FAQ page built as explicit Q&A** — the format chatbots parse most effectively. What is Edge City? What is a network state? What does "tools for human flourishing" mean? Structured for answer engines, not keyword density.

**Product metadata strategy** — SEO titles, descriptions, and tags written to answer real questions people ask AI, not keyword-stuffed for Google.

AI-mediated discovery is still in early adoption. Most brands haven't structured their inventory for machine consumption yet. This builds that infrastructure while the gap is still open.`,
      },
      {
        type: 'rule-list',
        label: 'outcome',
        leftAlign: true,
        body: 'The brief named two problems: no design system, and no machine legibility. Both were resolvable — they just required building the right artifacts in the right order. Each deliverable below maps directly to one of those problems.',
        items: [
          'BRAND.md — the living brand document. the why behind every visual decision.',
          'DESIGN.md — one file any developer or AI coding tool reads before touching the codebase.',
          'tokens.json — platform-agnostic token file. web and iOS in sync.',
          'Figma library — full component library, every variant, every state.',
          'llms.txt + JSON-LD — the store is machine-readable.',
          'FAQ page — structured for answer engines.',
          'INSTRUCTIONS.md — a reusable workflow that reproduces this entire deliverable set for any future project.',
        ],
      },
      {
        type: 'text',
        label: '',
        noTight: true,
        body: `A developer joining the project cold can open DESIGN.md and build to spec from day one — design decisions made once carry through every future build.

An AI coding session that previously returned generic Shopify patterns now opens with full token context. The gap between AI-generated and on-brand closes on the first pass.

When an AI agent is asked where to find Edge City merch, the store surfaces in the answer — not as a ranked result, but as a direct response with product name, price, and availability.`,
      },
    ],

  },
];

// ─── Helpers ──────────────────────────────────────────────

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
