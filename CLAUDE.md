# tessaract.xyz — Project Context for Claude

Read this before doing anything. This is the persistent context for every session working on this project.

---

## Who Tessa Is

**Tessa Maneewong** — Senior Product Designer based in Los Angeles.
- Email: tesmaneewong@gmail.com
- Portfolio: tessaract.xyz
- LinkedIn: linkedin.com/in/tessaman
- Twitter: x.com/tessla0x0
- GitHub: github.com/tessaractt

Background spans fashion design (FIDM, 10 years industry) → UX/product design → AI-native + Web3 products. The cross-disciplinary background is a feature, not a footnote.

Currently targeting: Senior Product Designer roles, Design Systems, AI-native product teams, Web3. LA or remote.

**Voice:** Direct, research-based, not salesy. Analytical confidence. Doesn't sound like marketing copy. When something sounds like "we are building a moat" or "this is that work" — rewrite it.

---

## What tessaract.xyz Is

Personal portfolio and case study site. Built with Next.js 16 App Router. Live at https://tessaract.xyz.

**Not a CV site.** Tessa doesn't want a resume page. Instead:
- `public/llms.txt` — concise profile for AI agent crawlers
- `public/llms-full.txt` — full work history for deeper agent reads  
- JSON-LD `Person` schema embedded in `app/layout.tsx` — silent, no UI
- The work speaks through case studies, not a list of jobs

---

## Tech Stack

- **Framework:** Next.js 16 App Router (`app/` directory, Server + Client components)
- **Styling:** CSS Modules + design tokens in `styles/tokens.css`
- **Fonts:** Krona One (`--font-display`), IBM Plex Mono (`--font-mono`), Inter (ECG only), Instrument Serif italic (ECG nav only)
- **Data:** `data/case-studies.ts` (rich case studies), `data/projects.ts` (simple projects)
- **Case study page:** `app/(site)/tessaverse/[slug]/page.tsx`
- **Sandbox:** `app/(site)/tessaverse/sandbox/page.tsx` — local-only experiments, not linked from nav

---

## Case Studies — Current State

### Edge City Goods (`/tessaverse/edge-city-goods`) ✅ COMPLETE
The main case study. A design system + AI-native commerce layer for goods.edgecity.live.
- Role: Independent Designer · 2025 – present
- Full feature set built and live

**Sections built (in order):**
1. The brief
2. What I built (with homepage screenshot)
3. DESIGN.md — visual diff demo (WithoutCard / WithCard toggle)
4. Brand foundation — color cards, type scale, surface hierarchy demo, motion demo
5. Cross-platform tokens (web + iOS only — no World mini app)
6. Selected components — ComponentKitDemo (interactive cart, size guide, product card, nav pill)
7. "Figma is one path..." paragraph — agent-buildable components point
8. AI-native commerce layer — llms.txt pipeline demo → JSON-LD schema demo → FAQ/metadata copy
9. Outcome — deliverables list + impact narratives
10. Full story (Substack link placeholder)

**Interactive components (all in `_components/`):**
- `VisualDiffDemo` — DESIGN.md before/after toggle
- `SurfaceHierarchyDemo` — hover to preview glass surfaces
- `MotionDemo` — floating product images
- `ComponentKitDemo` — full interactive UI kit (cart, size guide, product card, nav)
- `LlmsPipelineDemo` — animated agent discovery pipeline
- `JsonLdDemo` — black tee image switcher + scrollable JSON-LD

### Innermost (`/tessaverse/innermost`) ✅ EXISTS
Wellness mini-app on World App. 2,000+ users. World Build Labs Cohort 2.

### Pending case studies (not yet built):
- Cursive Connection (Ethereum Foundation grantee project)
- Verify Media (FOX Tech)
- Myosin Hivemind
- breathing.ai

---

## case-studies.ts — Data Structure

**FeatureBlock types:**
```
text | loop | table | list | rule-list | color-cards | type-scale |
surface-demo | motion-demo | component-kit-demo | visual-diff-demo |
llms-pipeline-demo | json-ld-demo | visual | text+visual
```

**Key properties on text blocks:**
- `label: ''` (empty string) → block renders tight (negative margin-top via `.featureBlockTight`)
- `noTight: true` → breaks tight chain, restores full 60px gap
- `**bold**` syntax → renders as `<strong>` via `richText()` helper

**isTight logic (in `[slug]/page.tsx`):**
Tight: `visual-diff-demo`, `llms-pipeline-demo`, `json-ld-demo`, and `text` blocks with empty label and no `noTight: true`.

---

## ECG Design System Rules

These apply inside the Edge City Goods case study components only.

**Tokens:**
- `--color-surface`: `rgba(255,255,255,0.15)` — glass light (cards, nav)
- `--color-surface-dark`: `rgba(0,0,0,0.35)` — glass dark (modals, overlays)
- `--color-surface-solid`: `rgba(255,255,255,0.80)` — form inputs
- `--color-border`: `rgba(255,255,255,0.20)`
- `--blur-glass`: `blur(16px)`
- `--radius-card`: `1rem`

**Background:** All visualization containers use `blue gradient 1.png` (`/images/tessaverse/edge-city-goods/blue gradient 1.png`). Never use CSS gradient approximations.

**Spacing system:**
- Scene padding (B): `2.75rem`
- Component gap (A): `1.5rem`
- Feature block gap: `--space-16` (60px)
- `featureBlockTight`: `margin-top: calc(-1 * var(--space-10))` (pulls 40px up)

**Surface hierarchy:** glass light → glass dark → glass solid. Never raw rgba in components — always use tokens.

**Layout stability rule:** Interactive/toggling blocks must never shift container height. Use fixed height + `height: 100%` on children.

**Scale:** `zoom: 0.9` on `.ecColumns` for uniform 10% reduction.

---

## Copy Rules (IMPORTANT)

1. **Never remove copy unless explicitly asked.** If unsure, keep it.
2. **ATS-first for resume/professional copy** — exact keyword phrases, numbers over adjectives, job title language that mirrors JDs.
3. **Research-based, not salesy.** No "moat", no "this is that work", no "the bottleneck."
4. **Don't make it sound like the designer's job is being replaced.** "Design decisions made once carry through every future build" — not "no design sync required."
5. **Bold using `**text**` syntax** in case study copy — renders via `richText()`.

---

## Image Assets (ECG)

Located in `/public/images/tessaverse/edge-city-goods/`:
- `blue gradient 1.png` — main background for all viz containers
- `coral shirt front.png`, `coral shirt back.png` — Esmeralda tee
- `black tee front.png`, `black tee back.png` — Edge City Unisex Tee (ecg-001)
- `green tote front.png`, `green cap.png` — other products
- `component background.png` — used in VisualDiffDemo WithCard
- `egde city goods homepage v2.jpg` — homepage screenshot

---

## Agent Discoverability Setup

- `public/llms.txt` — concise Tessa profile, crawled by AI agents
- `public/llms-full.txt` — full work history for deeper reads
- `app/layout.tsx` — JSON-LD `Person` schema, silent in `<head>`
- ECG case study has its own `llms.txt` pipeline demo and JSON-LD Schema.org product demo

---

## Sandbox

`/tessaverse/sandbox` — local-only experiment space. All new visual components are prototyped here first, then migrated to `_components/` for the case study page. Not linked from nav.

Current sandbox components: ColorCards, SurfaceDemo, FloatDemo, TypeScaleDemo, VisualDiffDemo, ComponentKitDemo, LlmsPipeline, LlmsFileSnippet, LlmsQueryComparison, JsonLdDemo.

---

## Git

Branch: `main`. Remote: GitHub. Push directly from terminal when Antigravity throws a lock file error:
```bash
rm ~/dev/tessaract.xyz/.git/index.lock  # if needed
cd ~/dev/tessaract.xyz && git add -A && git commit -m "message" && git push
```
