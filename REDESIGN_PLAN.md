# Cool-Car Visual Overhaul Plan

## Overview
Modernize the website's visual design while keeping all content, pages, and structure exactly the same. CSS-only restyle with minor HTML tweaks (e.g., adding classes for scroll animations).

## Pages in Scope
- `index.html` — Homepage (hero carousel, info cards)
- `import.html` — Vehicle import page (hero carousel, content sections, CTA)
- `sales.html` — Vehicle sales page (placeholder content)
- `about.html` — About page (3 mission/team sections with images)
- `contact.html` — Contact page (info, form, map, reviews widget)

## CSS Files to Modify
- `css/shared.css` — Global styles (header, footer, buttons, nav, animations, responsive)
- `css/index.css` — Homepage hero, cards, info section
- `css/import.css` — Import page hero carousel, content sections, CTA
- `css/about.css` — About sections and images
- `css/contact.css` — Contact form, map, contact info grid
- `css/sales.css` — Sales page content
- `script.js` — Add Intersection Observer for scroll-triggered animations

## Design Decisions

### Theme
- **Keep dark theme**, modernize the feel
- Remove cyberpunk/neon-heavy aesthetic in favor of refined, sophisticated dark design

### Accent Color
- **Shift from neon-red (`#ff004f`) to refined crimson** (~`#e63946` or `#dc2626`)
- Replace all heavy neon `box-shadow` glows with subtle, tasteful accents
- Remove `--neon-blue` and `--neon-purple` usage or replace with complementary tones

### Typography
- **Gallos Uncial stays ONLY for the "COOL-CAR" logo/brand text** (`.logo`, `.hero-logo`)
- **Everything else** (headings, body, nav, buttons, form fields) switches to a modern Google Font — **Inter** or **Outfit**
- Replace `font-family: Arial, sans-serif` throughout with the new font
- Add Google Fonts `<link>` to all HTML `<head>` sections

### Surfaces — Glassmorphism
- **Cards**: Semi-transparent backgrounds (`rgba(255,255,255,0.05)`), `backdrop-filter: blur(10px)`, subtle `1px solid rgba(255,255,255,0.1)` borders
- **Header**: Frosted dark glass background, fixed position kept, subtle gradient (no harsh red-to-black)
- **Footer**: Matching glassmorphism style with refined red accents
- **Form inputs**: Glass-style inputs matching the card aesthetic
- **Import sections**: Same glass card treatment

### Buttons
- **Pill-shaped** (`border-radius: 50px`)
- **Subtle red gradient fill** (e.g., `linear-gradient(135deg, #e63946, #c1121f)`)
- **Smooth hover transitions**: slight scale-up (`transform: scale(1.05)`), brightness shift
- **No pulsing glow animation** — remove `@keyframes pulse` on hover
- Clean `transition: all 0.3s ease`

### Animations
- **Scroll-triggered reveals**: Use Intersection Observer API in `script.js`
- Elements get a `.reveal` class, start with `opacity: 0; transform: translateY(30px)`
- When scrolled into view, add `.revealed` class → `opacity: 1; transform: translateY(0)`
- Apply to: cards, about sections, import sections, contact grid, CTA sections
- Keep existing hero fade-in animation

### Backgrounds
- **Subtle dark gradients** behind sections for depth (e.g., `linear-gradient(135deg, #0a0a0a, #111, #0d0d0d)`)
- Consider radial gradient accent spots (very subtle red/warm glow in corners)
- Provides visual separation between sections without hard borders

### Header (Specific)
- Background: `rgba(10, 10, 10, 0.8)` with `backdrop-filter: blur(20px)`
- Remove harsh `box-shadow: 0 0 15px var(--neon-red)` → replace with subtle `border-bottom: 1px solid rgba(255,255,255,0.1)`
- Keep fixed position and `z-index: 1000`
- Refine the `::after` gradient fade to be softer
- Mobile nav dropdown: match glassmorphism style

### Footer (Specific)
- Match header glassmorphism style
- Refined red accents on social icons (subtle border, no heavy neon glow)
- Social icon hover: smooth color fill, no heavy glow/box-shadow

### Social Icons
- Tone down: remove heavy `box-shadow: 0 0 10px` glow
- Subtle border: `1px solid rgba(255,255,255,0.2)` → on hover, border becomes accent red
- Smooth transitions, slight scale on hover

## What NOT to Change
- All text content (Czech language)
- Page structure and HTML layout
- Number of pages
- Image carousel functionality
- Web3Forms contact form integration
- Google Maps embed
- CommonNinja reviews widget
- Favicon and logo image
