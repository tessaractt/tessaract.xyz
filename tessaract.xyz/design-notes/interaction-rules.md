# Interaction & Motion Rules — Tessaract.xyz

## General Philosophy
- Interaction should feel intentional and playful
- Motion supports orientation, not decoration
- Nothing should move without user intent

---

## Navigation
- Navigation state changes on hover and click only
- Page changes should feel slightly cinematic

---

## Hover States
- Hover reveals emphasis, not new content
- Use opacity, weight, or subtle position shift
- Avoid scale-heavy or elastic effects

---

## Scroll Behavior
- No scroll-jacking
- Most pages should fit within one screen height
- Portfolio detail pages may scroll naturally

---

## Animation Timing
- Default duration: ~300–400ms
- Easing: subtle, slightly bouncy
- No infinite or looping animations

---

## Fallback Rule
If an interaction feels unnecessary, remove it.
The site should feel complete without motion.

---

## Layering & Overlays

- A fixed dot-grid overlay sits visually above all page content
- The overlay does not scroll
- The overlay must not block interactions (`pointer-events: none`)
- Left side rail sits above the grid
- All buttons, links, and inputs remain clickable

