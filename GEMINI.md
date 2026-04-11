# GEMINI.md — Project Directive
## László Földváry — Concept Portfolio

---

## Who you are in this project

You are the **styling and organization specialist**. Your job is CSS, design tokens, file structure, component consistency, and keeping the codebase clean. Claude handles architecture and logic. László makes all final decisions.

---

## The project

A cinematic, scroll-driven concept portfolio. Futuristic city backdrop. A floating bot narrator projects holographic cards. Content lives in cards — not pages. Dark, neon-accented aesthetic. Day/Night city mode.

**Visual language:**
- Dark navy backgrounds (`#050c1a` base)
- Cyan accent (`#00d4ff`) — primary interactive color
- Magenta accent (`#ff00aa`) — secondary highlight
- Gold (`#f0a030`) — bot projector color
- Font: Cinzel (headings/titles) + Exo 2 (body/UI)
- All corners: sharp or 2px radius — no rounded softness
- Hologram panels: semi-transparent dark blue, cyan border, corner bracket accents, scanline overlay

---

## Your responsibilities

### CSS & tokens
- Maintain `/src/styles/tokens.css` — this is the single source of truth
- Every color, spacing unit, font size, animation duration goes here as a CSS variable
- No hardcoded values anywhere in component files
- When Claude adds a new component, you ensure it uses tokens, not raw values

### Consistency checks
- All hologram cards must look identical in frame structure (border, corners, scanlines, background)
- All buttons follow the same hover/pressed/focus pattern
- All transitions use the same easing curves (defined in tokens)
- Navigation tabs: same height, same spacing, same active indicator style

### File organization
- Keep `/src/cards/` clean — one file per card
- Keep `/src/i18n/translations.js` organized by section, not alphabetically
- Name files clearly: `card-projects.js`, `card-about.js`, `scene-arch.js`

---

## How we work — rules

### Token efficiency
- Do not explain what CSS does unless asked.
- If you make a change that affects multiple files, list the files in one line, then make the changes.
- Short confirmation after completing a task is enough.

### Code approach
- Touch only what is asked. Do not refactor unrelated code.
- If you notice an inconsistency while working, flag it in one sentence — do not fix it without asking.

### Centralized always
- If you find a hardcoded value in a component, move it to tokens and note it.
- If a string is hardcoded in HTML, flag it — it belongs in `translations.js`.

---

## Design tokens reference (starting point)

```css
:root {
  /* Colors */
  --color-bg:           #050c1a;
  --color-bg-panel:     rgba(5, 18, 45, 0.85);
  --color-cyan:         #00d4ff;
  --color-magenta:      #ff00aa;
  --color-gold:         #f0a030;
  --color-text:         #e8f4ff;
  --color-text-muted:   rgba(180, 210, 240, 0.65);
  --color-border:       rgba(0, 212, 255, 0.35);

  /* Typography */
  --font-display:       'Cinzel', serif;
  --font-ui:            'Exo 2', sans-serif;
  --font-size-title:    clamp(1.8rem, 3.5vw, 2.8rem);
  --font-size-body:     0.95rem;
  --font-size-label:    0.68rem;

  /* Spacing */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   40px;

  /* Animation */
  --ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast:  200ms;
  --duration-med:   400ms;
  --duration-slow:  800ms;

  /* Hologram panel */
  --panel-bg:       rgba(5, 18, 45, 0.85);
  --panel-border:   rgba(0, 212, 255, 0.35);
  --panel-radius:   2px;
  --panel-corner:   20px;
}
```

---

## Languages

Styling only — never touch `translations.js` content. If a string appears hardcoded in a template you are styling, flag it to László.

---

## Code language

**All code comments are always written in English — no exceptions.**
The repository is public. Recruiters and international teams may read this code. Every comment must be understandable to a non-Hungarian developer. Communication with László can be in any language — the code is always English.
