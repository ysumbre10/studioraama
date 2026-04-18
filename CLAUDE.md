# Studiorama Website — CLAUDE.md

## Project Overview

A static boutique interior design studio website for **Studio Raama** (studioraama.com). No build step, no package manager — pure HTML/CSS/JS served directly via GitHub Pages.

**Live URL:** https://studioraama.com  
**Client:** Studio Raama (interior design studio, Bangalore)  
**Founders:** Aman Tank, Radhika Maheshwari

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 with custom properties (no preprocessor) |
| JavaScript | Vanilla JS (ES6+), IIFE pattern |
| Animations | GSAP + ScrollTrigger (CDN) |
| Carousel | Swiper.js v11 (CDN) |
| Fonts | Google Fonts — Poppins (all weights) |
| Deployment | GitHub Pages via GitHub Actions |
| Domain | Custom domain via CNAME (`studioraama.com`) |

**CDN Dependencies (loaded in HTML `<head>`):**
- `https://cdn.jsdelivr.net/npm/swiper@11/` — Swiper CSS + JS
- `https://cdnjs.cloudflare.com/ajax/libs/gsap/` — GSAP + ScrollTrigger
- `https://fonts.googleapis.com/css2?family=Poppins` — Poppins font

---

## Folder Structure

```
studiorama/
├── index.html                        # Homepage
├── about/
│   └── index.html                    # About Us (founders, philosophy)
├── services/
│   ├── index.html                    # Services overview
│   ├── design-development/
│   │   └── index.html               # Service detail page
│   └── kitchen-bathroom/
│       └── index.html               # Service detail page
├── portfolio/
│   └── index.html                    # Our Work / Projects
├── contact/
│   └── index.html                    # Get in Touch
├── assets/
│   ├── css/
│   │   ├── style.css                 # Global styles, CSS variables, components
│   │   ├── homepage.css              # Homepage-only styles
│   │   ├── pages.css                 # Interior pages (about, contact, portfolio)
│   │   └── service-page.css          # Service detail page styles
│   ├── js/
│   │   └── script.js                 # All JavaScript (490 lines, IIFE-wrapped)
│   ├── images/
│   │   ├── portfolio/                # Project images (WebP)
│   │   ├── services/                 # Service card images (WebP)
│   │   └── team/                     # Founder photos (WebP)
│   └── videos/
│       └── table.mp4                 # Project showcase video
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Pages auto-deploy on push to main
├── CNAME                             # studioraama.com
├── robots.txt
├── sitemap.xml
├── favicon.png
└── CHANGES.md                        # Client change tracking log
```

---

## Design System

### Color Palette (CSS Variables)

| Variable | Hex | Usage |
|---|---|---|
| `--charcoal` | `#1C1714` | Dark backgrounds, headings |
| `--cream` | `#F5F0EB` | Primary background, light text |
| `--gold` | `#B8A68E` | Accent color, highlights |
| `--grey` | `#A0907A` | Muted/secondary text |
| `--white` | `#FFFFFF` | Cards, overlays |

### Typography

- **Font family:** Poppins (both heading and body — `--font-heading`, `--font-body`)
- **Fluid sizing:** `clamp()` used throughout for responsive type
- **Italic accents:** Applied to select phrases per client preference

### Theme System

- Light mode (default) / Dark mode via `data-theme="dark"` on `<body>`
- Toggle button with sun/moon icons on every page
- Preference persisted in `localStorage` key: `studioraama-theme`
- All colors transition smoothly via `--transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

---

## Pages & Key Sections

### Homepage (`/`)
- Full-screen hero with vertical-fade Swiper carousel (custom wheel throttle: 800ms)
- Dual navigation: overlay nav during hero (`hp-header`) → standard nav on scroll (`hp-nav-full`)
- Service cards grid
- "Why Choose Us" section
- Testimonials carousel (7s auto-rotate)
- "Featured In" logos (India Design World, Home Publication)
- Slide counter display

### About (`/about/`)
- Split hero: left text, right image
- Founder bios with photos (Aman Tank, Radhika Maheshwari)
- Design philosophy narrative

### Services (`/services/`)
- 6 service cards grid
- Each service has a detail page under `/services/<slug>/`

### Portfolio (`/portfolio/`)
- Project showcase with auto-rotating gallery
- WebP images, video integration

### Contact (`/contact/`)
- Split hero layout
- Contact form
- WhatsApp, email, phone links

---

## JavaScript Architecture (`assets/js/script.js`)

Single IIFE-wrapped file. Key modules:

- **Preloader** — GSAP timeline, 5s safety timeout
- **Custom Cursor** — Dual-dot ring, `mix-blend-mode: difference`
- **Scroll Progress Bar** — Fixed top indicator
- **Hero Swiper** — Vertical fade, wheel + touch aware, slide counter
- **Magnetic Buttons** — Mouse-tracking on `[data-magnetic]` elements
- **Theme Toggle** — localStorage, `data-theme` on `<body>`
- **GSAP ScrollTrigger Animations** — Section reveals, stagger cards (`once: true`)
- **Testimonial Carousel** — Auto-rotate, manual controls
- **Mobile Menu** — Hamburger toggle

---

## CSS Architecture

- **BEM-like naming:** `block__element--modifier` (e.g., `.hp-header__logo`, `.service-card--linked`)
- **Component separation:** Global → `style.css`, page-specific → `homepage.css`, `pages.css`, `service-page.css`
- **CSS custom properties** for all design tokens (colors, shadows, transitions)
- **Mobile-first breakpoints** at `max-width: 768px`

---

## SEO & Metadata

Every page includes:
- `<title>`, `<meta name="description">`, canonical `<link rel="canonical">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Geo-location meta (`geo.region`, `geo.placename`)
- Schema.org JSON-LD (LocalBusiness, BreadcrumbList, VideoObject on relevant pages)
- `robots.txt` and `sitemap.xml` at root

Image optimization:
- All images in **WebP** format
- `<link rel="preload">` for hero images in `<head>`
- `loading="lazy"` on below-fold images

---

## Deployment

**Auto-deploy via GitHub Actions** on every push to `main`:

```yaml
# .github/workflows/deploy.yml
# Trigger: push to main
# Steps: configure-pages → upload-pages-artifact (root dir) → deploy-pages
```

**Git remotes:**
- `origin` — personal/dev repo
- `personal` — client's repo (`studioraama-website`) — **live site pulls from here**

**Push rule:** Always push to all 3 remotes (`origin`, `personal`, and client remote) or the live site will not update. Review on localhost first; only push when confirmed ready.

---

## Pending Client Assets

Items awaiting delivery from client (tracked in `CHANGES.md`):

- [ ] Actual logo image files for India Design World and Home Publication
- [ ] Final founder photos
- [ ] Project gallery images: Earthy Abode, Calm Nest, Bohemian Edit
- [ ] Genuine client testimonials with names and photos

---

## Development Notes

- No build step — edit files directly and open in browser
- No package.json / node_modules
- Test locally by opening `index.html` in browser or via a simple HTTP server (`python3 -m http.server`)
- All CDN libraries loaded from `<head>`; no local copies
- `CHANGES.md` is the client change log — update it when making client-requested changes
