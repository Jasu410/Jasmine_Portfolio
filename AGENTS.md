# AGENTS.md

## Overview
Single-page React (Vite, JavaScript) portfolio for Shaik Jasmine, deployed on Netlify. No router;
sections are stacked in `src/App.jsx` and linked with in-page anchors.

## Key directories
- `src/data/content.js` — **single source of truth for all copy.** Only use facts the owner has
  provided; never invent repos, LeetCode stats, metrics, employers or links.
- `src/components/` — one file per section (`Hero`, `About`, `Skills`, `Experience`, `Education`,
  `Beyond` (languages + soft-skill orbit), `Connect`, `Contact`, `Footer`) plus shared pieces
  (`RevealText`, `Magnetic`, `SectionLabel`, `SocialLinks`, `Icons`, `Cursor`, `Loader`).
- `src/components/HeroScene.jsx` — React Three Fiber scene. Lazy-loaded from `Hero.jsx`, quality
  tier (`high|medium|low`) chosen by viewport width, `frameloop` set to `never` when the hero is off
  screen. Labels are CanvasTexture sprites (no drei dependency).
- `src/components/projects/` — `Projects` (showcases), `HRVVisual`, `RailwayVisual`, `ProjectModal`.
- `src/styles/global.css` — all styles, organised by section, with design tokens at the top.
- `public/__forms.html` — static skeleton so Netlify detects the `contact` form at build time. The
  React form POSTs (urlencoded) to `/__forms.html`. Keep field names in sync between the two.

## Conventions
- Animation: Framer Motion everywhere; `MotionConfig reducedMotion="user"` is set at the root and
  CSS has a `prefers-reduced-motion` block. GSAP was intentionally not added to keep the bundle lean.
- Custom cursor only mounts on `(hover: hover) and (pointer: fine)` devices. Elements opt into
  cursor states with `data-cursor="hover|view"` and `data-cursor-label`.
- Use the `translate` CSS property (not `transform`) for keyframed offsets on elements that also
  get hover transforms (see `.eco__node-inner`, `.orbit__chip`).
- Palette: off-white bg, navy ink `#0e1530`, lavender `#8b7cf6`, blue `#2f6bff`, coral `#ff7a85`.
  Fonts: Space Grotesk (display) + Inter (body).
