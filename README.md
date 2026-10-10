# Shaik Jasmine — Interactive Portfolio

A premium, light-themed interactive portfolio for Shaik Jasmine, Computer Science Engineering
graduate and aspiring software engineer. The site is a single scrolling story: an interactive
3D hero, a custom cursor, a connected skills ecosystem, a scroll-driven internship timeline,
two animated project showcases (an HRV / 1D-CNN signal visualisation and a railway route with a
moving train), an education timeline, languages and soft skills, profile links and a working
contact form.

## Tech

- **React 19 + Vite** (plain JavaScript)
- **React Three Fiber / Three.js** — hero scene, lazy-loaded, paused off-screen, with a CSS fallback when WebGL isn't available
- **Framer Motion** — scroll-linked progress, text reveals, magnetic buttons, modal transitions
- **Lucide React** — UI icons (brand marks are inline SVG)
- **Netlify Forms** — contact form submissions (no custom backend)

## Run locally

```bash
npm install
npm run dev
```

To test the contact form with Netlify emulation, use `netlify dev` instead.

## Editing content

All copy — profile links, skills, experience, projects, education, languages and soft skills —
lives in `src/data/content.js`. Update it there; components read from it.

## Contact form

Submissions appear in the Netlify dashboard under **Forms → contact**. To get emails, add a
notification under *Project configuration → Notifications → Form submission notifications*.
