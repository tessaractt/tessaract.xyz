# tessaract.xyz

Personal portfolio and case study archive for Tessa Maneewong — product designer working at the intersection of systems thinking, brand, and AI-native product.

## stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — CSS Modules + design tokens (`styles/tokens.css`)
- **Fonts** — Krona One (display), IBM Plex Mono (mono)
- **Deployment** — Vercel

## structure

```
app/(site)/          — main site routes
  page.tsx           — home / landing
  tessaverse/        — portfolio + case studies
data/
  projects.ts        — project cards for tessaverse
  case-studies.ts    — full case study content
components/          — shared UI (Nav, layout)
styles/              — global styles and tokens
public/images/       — project visuals organized by slug
```

## case studies

Case studies live in `data/case-studies.ts` and render via `app/(site)/tessaverse/[slug]/page.tsx`. Visuals go in `public/images/tessaverse/[slug]/`.

To add a new case study: add an entry to `caseStudies[]`, add `caseStudySlug` to the matching project in `projects.ts`, and drop images into the slug folder.
