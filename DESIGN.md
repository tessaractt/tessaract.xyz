# DESIGN.md — Tessaract.xyz
*Technical design reference for AI tools and developers.*  
*Source of truth: `styles/tokens.css`, `app/globals.css`, and `design-notes/`.*

---

## Brand Personality

Tessaract feels like a well-worn atelier: precise, quiet, and confident without announcing itself. The site never sells — it simply presents. Restraint is the defining trait: every element earns its place, white space is structural not decorative, and the royal blue appears only where it means something (active state, links, services). The monospace rail and dot grid give it a drafting-table quality — utilitarian and craft-driven — while the slightly bouncy easing and scramble-text animation add just enough warmth to keep it from feeling cold. If the site is working, a visitor should leave thinking "this person has taste" without being able to say exactly why.

---

## Background / Base Layer

The base is `#F3F5F8` (--color-nothing-white) — an off-white with a faint blue undertone, never pure white. Sitting fixed above all page content (z-index 20, `pointer-events: none`) is a CSS dot-grid overlay: 2×2px dots in `#C0C0C0`, spaced 62px apart on both axes, offset 60px from the left edge. The grid does not scroll. It should always be present and should never block clicks. The left side rail renders above the grid (z-index 30).

---

## Color System

All tokens are in `styles/tokens.css`.

| Token | Value | Usage |
|---|---|---|
| `--color-royal-blue` | `#0038C6` | Primary: active nav, CTAs, services text, email links, project titles/descriptions |
| `--color-black` | `#000000` | Foreground text, borders, nav default, footer bg |
| `--color-nothing-white` | `#F3F5F8` | Page background, nav hover text, footer text |
| `--color-gray-text` | `#646464` | Muted / secondary text (e.g., gray part of hero headline) |
| `--color-gray-light` | `#D4D4D4` | Scrollbar thumb |
| `--color-gray-dot` | `#C0C0C0` | Dot grid overlay dots |
| `--color-rail-blue-1` | `#0038C6` | Side rail color bar 1 |
| `--color-rail-blue-2` | `#1E3A8A` | Side rail color bar 2 |
| `--color-rail-blue-3` | `#3B82F6` | Side rail color bar 3 |

**Semantic aliases** (prefer these in components):

| Semantic Token | Maps To |
|---|---|
| `--color-background` | `--color-nothing-white` |
| `--color-foreground` | `--color-black` |
| `--color-primary` | `--color-royal-blue` |
| `--color-muted` | `--color-gray-text` |
| `--color-border` | `--color-black` |

**Constraints:**
- Royal blue is used **only** for active/interactive states and primary content emphasis. Never use it as a background or for decorative purposes.
- Do not add new colors without updating `tokens.css`. No inline hex values in components.
- Text selection uses `--color-primary` background + `--color-nothing-white` text (set globally in `globals.css`).

---

## Typography

Fonts are loaded via `next/font` in `app/layout.tsx` and injected as CSS variables. Do not import them anywhere else.

| Role | Font | Variable | Weights | Use |
|---|---|---|---|---|
| Display | Krona One | `--font-display` | 400 only | All headings, nav, hero, services, body text |
| Mono | IBM Plex Mono | `--font-mono` | 400, 500, 600, 700 | Footer, labels, side rail, project descriptions, email |

> **Note:** `tokens.css` lists `Kode Mono` as a fallback comment — the actual runtime font is IBM Plex Mono set by `next/font`. Always reference `--font-mono`, not the family name directly.

**Type scale:**

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | 10px | Nav items, labels |
| `--text-sm` | 12px | Small labels, side rail valueLabel |
| `--text-base` | 15px | Footer text, side rail info, email |
| `--text-lg` | 16px | Body (default) |
| `--text-xl` | 18px | Tags |
| `--text-2xl` | 20px | General |
| `--text-3xl` | 25px | Contact heading |
| `--text-4xl` | 35px | Hero headline, services, contact types |
| `--text-5xl` | 40px | Reserved / largest headline |

**Rules:**
- All `h1–h6` are uppercase, weight 400, letter-spacing `--tracking-tight` (-3.5px), line-height 1.1.
- Nav links use `--tracking-nav` (-1px).
- Body line-height is 1.4.
- Never use bold weight on display text — Krona One ships in 400 only.
- Mono text is sentence-case or uppercase depending on context; never mixed-case for labels.
- On mobile (<600px) hero/services scale down to 22px with letter-spacing -1.5px.

---

## Surface / Material System

No glass, blur, or shadow-heavy surfaces. The site is flat and border-driven.

- **Primary surface**: `--color-background` (#F3F5F8)
- **Bordered panels**: `border: 0.7px solid var(--color-black)` — used on nav pills, side rail, social link boxes
- **Footer**: inverted — `background: var(--color-black)`, text in `--color-nothing-white)`
- **Speech bubbles** (contact collage): `background: #fff`, `border-radius: 12px`, `box-shadow: 0 8px 30px rgba(0,0,0,0.12)` — the only shadow in the system
- **Pill radius**: `--border-radius-pill: 20px` (nav, CTA buttons)
- **Small radius**: `--border-radius-sm: 4px` (media containers)
- **Border width**: `--border-width: 0.7px` — intentionally hairline; never round up to 1px

---

## Motion

All motion tokens are in `tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Reserved |
| `--duration-base` | 300ms | Default transitions (hover, nav) |
| `--duration-slow` | 400ms | Slower interactions |
| `--ease-default` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slightly bouncy — all transitions |

**Hover pattern**: `opacity: 0.7` on links/social. Nav inverts to black bg + white text. CTA buttons fill royal blue on hover. No scale transforms, no translate effects on hover.

**ScrambleText** (`app/(site)/_components/ScrambleText.tsx`): On mount, displays random characters from `!<>-_\\/[]{}—=+*^?#_`, then resolves to real text over ~1.5s using `easeOutQuart`. Used for hero headline. Characters resolve organically (not strictly left-to-right) with a small random threshold offset. Always provide `aria-label` and a visually-hidden real-text fallback — already handled inside the component.

**GSAP** (contact collage): `gsap` + `@gsap/react` handle the contact page image interactions. Collage items animate `opacity`, `grayscale` filter, and `pointer-events` on click-to-focus. Speech bubbles toggle `display: flex` via GSAP. No looping animations anywhere.

**Accessibility override**: If `prefers-reduced-motion` is active, do not trigger ScrambleText animation — render final text immediately. GSAP interactions should also be suppressed or made instant.

**Rules:**
- No infinite or auto-looping animations.
- No scroll-jacking.
- If an animation is removed, the site should still feel complete.
- Nothing moves without user intent (hover, click).

---

## Layout

**Design frame**: 1280 × 832px (from Figma).

**Spacing scale** (non-standard, token-based):

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 10px |
| `--space-4` | 15px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 30px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 60px |
| `--space-nav-padding-x` | 15px |
| `--space-nav-padding-y` | 10px |

**Breakpoints:**

| Breakpoint | Behavior |
|---|---|
| >1200px | Full layout, side rail visible, social icons at 80×80px |
| ≤1200px | Social icons shrink to 60×60px, main gets 30px side padding |
| ≤900px | Side rail hidden, main gets 20px padding + 80px top / 100px bottom, social links move to bottom center, footer centers |
| ≤600px | Mobile — reduced padding, social links at 60×60px, hero text scales down |

**Z-index stack:**

| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Default page content |
| `--z-content` | 10 | Footer, social links |
| `--z-dot-grid` | 20 | Dot grid overlay |
| `--z-side-rail` | 30 | Side rail |
| `--z-nav` | 40 | Navigation |
| `--z-overlay` | 50 | GSAP click overlay (contact page) |

**Content max-widths**: About content column: 714px. Tessaverse grid: 1200px. Contact left column: 302px. Contact collage: 570×615px.

**Page height philosophy**: Most pages fit within one viewport height. Tessaverse and contact pages may scroll naturally. No scroll-jacking.

---

## Components

### Nav
Centered, fixed top (12px from top). Three pill-shaped links in a row. Default: no fill, black 0.7px border, black text, 10px font (Krona One, uppercase, -1px tracking). Hover: fills black, text flips to nothing-white. Active: fills `--color-royal-blue`, border color matches. Gap between items: 15px desktop / 10px tablet / 6px mobile.

### GridOverlay
Fixed to viewport, `pointer-events: none`, z-index 20. Pure CSS: `radial-gradient` draws 2px dots in `#C0C0C0`, repeated every 62px, offset 60px from left. No image assets. `aria-hidden="true"`. Always present, never interactive.

### SideRail
Fixed left panel, 200px wide, full viewport height minus 24px (12px top + bottom clearance). Black 0.7px border. Contains: header with `TESSARACT.XYZ` title (mono), info lines (mono uppercase), dashed divider, year range with arrow, three stacked color bars (20×40px, royal blue variants), vertically rotated branding text, and dot-matrix value indicators at the bottom. Hidden at ≤900px.

### SocialLinks
Fixed top-right on desktop (18px from right, 12px from top), vertical stack with 10px gap. Each link is a bordered 80×80px box (0.7px black border) containing an SVG icon, with a mono label (9px, uppercase) below. On ≤900px: moves to bottom center in a horizontal row above the footer. On mobile, border disappears (transparent bg). Icons: Twitter/X, GitHub, LinkedIn (SVG files in `public/images/icons/`).

### Footer
Fixed bottom-right (18px right, 12px bottom), z-index 10. Black background, nothing-white text. IBM Plex Mono, 15px. Contains a small triangle SVG + `TESSA MANEEWONG [YEAR]`. On ≤900px: centers horizontally, min-width 230px. On mobile: font shrinks to 8px.

### ProjectSection
Used in Tessaverse grid. Each project renders: title (Krona One, 1.5rem, royal blue, uppercase), description (IBM Plex Mono, 0.875rem, royal blue), CTA buttons (pill-shaped, 0.7px royal blue border, mono 0.75rem lowercase text, fills royal blue on hover), and a banner image. Grid supports `colSpan: 1` (half) or `colSpan: 2` (full width). Grid collapses to single column below 768px. Section padding-bottom: 4rem.

### ScrambleText
Client component. On mount, renders scrambled characters from a fixed set, then resolves to real text over 1.5s with `easeOutQuart` easing. Characters resolve in a slightly randomized order. Wraps text in a `<span>` with `aria-label` on the outer element and a visually-hidden real-text `<span>` for screen readers. Used for hero headline on the About page.

### CaseStudyPage
Route: `app/(site)/tessaverse/[slug]/page.tsx`. Checks `data/case-studies.ts` first (rich view), falls back to `data/projects.ts` (simple view). Max-width 780px, centered. All body copy and section labels use `--color-royal-blue`. Table and list item text stays black for readability. **No borders between sections** — spacing alone separates content blocks. The `.featureBlock` class uses only `gap`, no `border-top`. The `.header` has no `border-bottom`. The only borders present are: hairline on tag pills, table row dividers (within tables only), and the core loop box. Copy protection: `user-select: none` on the container; `onCopy` and `onContextMenu` blocked via `CopyGuard` client component. Image save protection: transparent overlay div + `draggable={false}` on all `<Image>` elements via `ProtectedVisual` client component.

### Contact Collage
Absolutely positioned stack of 5 images (sky cube, Edge City tee, Cursive Connection app, Cursive Connection panel, Motus pet) inside a 570×615px container. Each image has z-index layering per Figma spec. GSAP animates click-to-focus: focused item becomes full opacity, others desaturate. Speech bubbles (white, 12px border-radius, mono 11px text, max-width 240px) appear on click with GSAP display toggle. A transparent full-screen click-outside overlay (z-index 40) dismisses the focused state.

---

## Do / Don't

| Do | Don't |
|---|---|
| Use `--color-royal-blue` for active, interactive, and primary-emphasis moments | Use royal blue as a decorative fill, background, or for non-interactive text |
| Use `--border-width: 0.7px` (hairline) for all borders | Round border-width up to 1px |
| Use Krona One for all display text (headings, nav, hero) | Use IBM Plex Mono for headlines or large text |
| Use IBM Plex Mono for all labels, mono UI, footer, and project descriptions | Mix font families within a single UI element |
| Keep hover to opacity-only or color-fill on bordered elements | Add scale, translate, or elastic hover effects |
| Keep transitions to 300–400ms with `--ease-default` (slightly bouncy) | Use linear easing or durations above 500ms |
| Respect z-index stack from tokens | Set arbitrary z-index values inline |
| Add new projects via `data/projects.ts` | Hardcode project content in page components |
| Use spacing/gap alone to separate case study sections | Add `border-top` or `border-bottom` between content sections on the case study page |
| Keep most pages within one viewport height | Introduce scroll-jacking or parallax |
| Use `pointer-events: none` on the GridOverlay always | Allow the dot grid to capture any pointer events |
| Use `--color-nothing-white` (#F3F5F8) for all light surfaces | Use pure white (#FFFFFF) as a background (except speech bubbles) |
| Reference fonts via `var(--font-display)` and `var(--font-mono)` | Import or reference Google Fonts directly in component files |

---

## Stack Reference

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | `app/` directory, route groups `(site)/`, server and client components |
| UI | React 19 | Use server components by default; add `'use client'` only when needed (GSAP, useState, animation) |
| Language | TypeScript 5 | Strict; all data shapes typed (see `data/projects.ts` for `Project` interface) |
| Styles | CSS Modules + `tokens.css` | No Tailwind utility classes in components; Tailwind CSS v4 is in `devDependencies` but the system is token/module-based |
| Fonts | `next/font/google` | Krona One + IBM Plex Mono loaded in `app/layout.tsx`, injected as `--font-display` / `--font-mono` CSS variables |
| Animation | GSAP 3 + `@gsap/react` | Used on contact page for collage interactions. ScrambleText uses vanilla `requestAnimationFrame` |
| Content | `data/projects.ts` | Structured array of `Project` objects; add all new projects here |
| Analytics | GA4 via `next/script` | Script in `app/layout.tsx`; Measurement ID should move to `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` |
| Deployment | Vercel | `vercel.svg` present in public; standard Next.js deployment |

**Key component locations:**
- Design tokens: `styles/tokens.css`
- Global styles + reset: `app/globals.css`
- Root layout (fonts, GA): `app/layout.tsx`
- Site layout (Nav, Rail, Footer, Grid): `app/(site)/layout.tsx`
- Shared layout components: `components/layout/`
- ScrambleText animation: `app/(site)/_components/ScrambleText.tsx`
- Project data: `data/projects.ts`
- Nav data: `data/nav.ts`
- Social data: `data/social.ts`
- Design intent docs: `design-notes/`
