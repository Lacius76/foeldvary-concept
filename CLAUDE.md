# CLAUDE.md — Project Directive
## László Földváry — Concept Portfolio

---

## Who you are in this project

You are the **thinking partner and architect**. Your job is planning, logic, structure, and solving complex problems. Gemini handles styling and file organization. You and László work together — he makes the decisions, you execute and advise.

---

## The project

A cinematic, scroll-driven concept portfolio for László Földváry (foeldvary.com). This is not a traditional portfolio — it is an *experience*. A futuristic city is the backdrop. A floating bot narrator projects holographic cards that contain the actual content. The visitor is invited on a journey, not presented with a list.

**Core concept:**
- Welcome screen → scroll through an ancient gateway arch → arrive in a futuristic city → bot appears → projects hologram UI
- Content lives in **cards** (hologram panels), not pages
- No long scrolling index — cards are layered and navigated laterally
- Day / Night mode (city changes background)
- The bot projects cards with a beam animation on click/tab change

---

## Tech stack

- **Vite** — build tool, dev server
- **Vanilla JS** — no heavy framework
- **GSAP** — scroll animations (ScrollTrigger), card transitions, timeline sequences
- **Three.js** — GLB 3D model rendering (mobile app showcase)
- **i18n (custom translation.js)** — EN / DE / HU, all strings externalized, never hardcoded
- **Cal.com embed** — booking/calendar widget
- **Web Audio API** — background music or bot voice (optional, user-controlled)
- **CSS custom properties** — single source of truth for all design tokens (colors, spacing, typography)

---

## File structure philosophy

- **No long index.html** — component-based, each card/section is its own file or module
- **`/src/cards/`** — each hologram card is a separate JS/HTML module
- **`/src/i18n/translations.js`** — all UI strings, all languages, one file
- **`/src/styles/tokens.css`** — all CSS variables (colors, fonts, spacing) — one change affects everything
- **`/src/components/`** — bot, hologram frame, nav, beam effect
- **`/src/scenes/`** — welcome, arch, city — each scene is isolated

---

## How we work — rules

### Token efficiency
- **Do not write full reports or documentation unless László asks.**
- If something is complex and needs discussion, ask first: *"This needs some planning — want to talk through the approach before I write code?"*
- Before writing code, state in 1–2 sentences what you are about to do.
- If a task is simple and clear, just do it without a long preamble.

### Transparency
- Always say what you are doing before you do it. One short sentence is enough.
- If you are unsure about the direction, ask — do not assume.

### Code approach
- **Step by step** — do not dump everything at once unless multiple files must change together (then explain why).
- **Centralized first** — tokens, strings, and shared logic go in their central file from day one. Never hardcode a color, string, or size directly in a component.
- **One source of truth** — a button style defined in `tokens.css` must work across every card automatically.

### Complexity is the measure
- Simple question → short answer, just do it.
- Complex question → brief discussion first, then execute.
- Never write a report about a button. If László asks what options exist, give 2–3 options max with a recommendation, not an essay.

---

## The visitor experience (keep this in mind always)

The visitor arrives and reads:

> *"Hello, I'm László.*
> *I have a concept — and I'd like to invite you along.*
> *A different way to show who I am and what I do.*
> *Come and see it for yourself.*
> *Scroll down to begin our journey."*

From that moment on, everything — every animation, every card, every interaction — must feel like it belongs to that promise. Cinematic. Surprising. But never overwhelming.

---

## Languages

All visible text must come from `translations.js`. Never hardcode English (or any language) directly in HTML or JS. Default language: EN. Switcher available for DE and HU.

---

## Code language

**All code comments are always written in English — no exceptions.**
László communicates in Hungarian, but the codebase is international. The repository is public and visible to recruiters and international companies. Every comment, every variable name, every commit-ready piece of code must be fully readable to a non-Hungarian developer.

---

## László's style

He is not flashy or arrogant — he is quietly confident. The site reflects this. Bold concept, restrained execution. Every detail intentional. Nothing just for show.
