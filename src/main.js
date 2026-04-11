import './style.css'

/* -------------------------------------------------------
   Cinematic scroll — single sticky canvas, 300vh total height
   t = scrollY / innerHeight drives all animations (0 to 3)

   Phase 1 (t 0→1): Intro text only — city & portal off screen
   Phase 2 (t 1→2): Portal rises (bottom to viewport bottom),
                     city moves up (only tower tops visible over the hill)
   Phase 3 (t 2→3): Portal zooms in, city slides up further
   ------------------------------------------------------- */

document.querySelector('#app').innerHTML = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Faculty+Glyphic&family=Exo+2:wght@300;400;500&display=swap" rel="stylesheet">

  <!-- 300vh wrapper — provides scrollable distance for 3 animation phases -->
  <div id="scroll-wrapper">

    <!-- Sticky canvas — pinned at top, all layers animate inside here -->
    <div id="scroll-canvas">

      <!-- Layer 0: sky backgrounds — day and night overlapping, crossfade via opacity -->
      <div id="scene-bg"       aria-hidden="true"></div>
      <div id="scene-bg-night" aria-hidden="true"></div>

      <!-- Layer 1: city group — sky gradient + city photos (day/night overlapping) -->
      <div id="city-bg" aria-hidden="true">
        <img class="city-top-img" src="/city_day_top.png" alt="">
        <!-- Wrapper to allow day/night crossfade via opacity overlay -->
        <div class="city-photo-wrap">
          <img class="city-main-img"  src="/city_day.jpg"   alt="">
          <img class="city-night-img" src="/city_night.jpg" alt="">
        </div>
      </div>

      <!-- Layer 2: portal image -->
      <img
        id="portal-img"
        class="portal-img"
        src="/portal.png"
        alt="Portal entrance"
      >

      <!-- Layer 3: bot narrator — enters from left after portal phase -->
      <div class="bot-wrap" id="bot-wrap">
        <img id="bot-img" src="/bot.png" alt="Bot narrator">
      </div>

      <!-- Layer 4: intro overlay (phase 1 only, fades out at phase 2 start) -->
      <div id="intro-overlay" aria-label="Introduction">
        <div class="intro-content">
          <h1 class="intro-greeting">Hello, I'm László.</h1>
          <p class="intro-body">
            I have a concept<br>
            and I'd like to invite you along.<br>
            A different way to show who I am and what I do.<br>
            Come and see it for yourself.
          </p>
        </div>
        <div class="intro-scroll-hint">
          <span>Scroll down to begin our journey.</span>
          <div class="bounce-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Day / Night toggle — fixed top-right, always visible -->
      <div id="theme-toggle-wrap">
        <label class="switch" aria-label="Toggle day/night mode">
          <input id="theme-input" type="checkbox" />
          <div class="slider round">
            <div class="sun-moon">
              <svg id="moon-dot-1" class="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-2" class="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="moon-dot-3" class="moon-dot" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-1" class="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-2" class="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="light-ray-3" class="light-ray" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-1" class="cloud-dark"  viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-2" class="cloud-dark"  viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-3" class="cloud-dark"  viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-4" class="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-5" class="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
              <svg id="cloud-6" class="cloud-light" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
            </div>
            <div class="stars">
              <svg id="star-1" class="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-2" class="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-3" class="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
              <svg id="star-4" class="star" viewBox="0 0 20 20"><path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path></svg>
            </div>
          </div>
        </label>
      </div>

    </div>
  </div>
`

/* -------------------------------------------------------
   Utilities
   ------------------------------------------------------- */
function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi) }

function lerp(a, b, t) { return a + (b - a) * t }

/* -------------------------------------------------------
   Cinematic scroll driver
   ------------------------------------------------------- */
function initCinematicScroll() {
  const portalImg    = document.getElementById('portal-img')
  const cityBg       = document.getElementById('city-bg')
  const introOverlay = document.getElementById('intro-overlay')
  const botWrap       = document.getElementById('bot-wrap')

  if (!portalImg || !cityBg || !introOverlay) return

  /* Start bot off-screen to the left */
  if (botWrap) botWrap.style.transform = 'translateX(-350px)'

  /* Geometry — measured after images load, refreshed on resize */
  let portalH = 0   // rendered height of portal image
  let cityH   = 0   // total height of city-bg stack (top.png + jpg)
  let vh      = 0   // viewport height

  /* Key Y offsets (all in pixels, translateY values for city-bg) */
  let cityHiddenY      = 0  // completely below viewport (phase 1)
  let cityPhase2EndY   = 0  // only tower tops visible above portal hill (phase 2 end)

  function measureGeometry() {
    vh      = window.innerHeight
    portalH = portalImg.offsetHeight   // depends on viewport width
    cityH   = cityBg.scrollHeight      // sum of both images' rendered heights

    /* City hidden: push it so its TOP stays below the canvas bottom.
       With bottom:0, city natural top = vh - cityH.
       For top >= vh: translateY >= cityH.
       Extra 100px margin for safety. */
    cityHiddenY = cityH + 100

    /* City phase-2 end: tower tops just peek above the portal's hill.
       Portal is at translateY=0 → bottom at vh, top at (vh - portalH).
       The hill in portal.png is roughly at 42% from the image top.
       Hill y in canvas = (vh - portalH) + portalH * 0.42 = vh - portalH * 0.58
       Set city top 20px below the hill:
         city top = (vh - cityH) + cityPhase2EndY  →  set to hillY + 20
         cityPhase2EndY = hillY + 20 - (vh - cityH) = cityH + 20 - portalH * 0.58 */
    cityPhase2EndY = Math.max(50, cityH + 20 - portalH * 0.58)
  }

  /* -------------------------------------------------------
     Animation tick — runs on every scroll event
     ------------------------------------------------------- */
  function tick() {
    /* t goes 0→3 across 450vh of scroll (550vh wrapper - 100vh canvas).
       Dividing by vh*1.5 maps each 150vh of scroll to 1 phase unit. */
    const t  = window.scrollY / (window.innerHeight * 1.5)
    const p2 = clamp(t - 1, 0, 1)   // 0→1 during second 100vh
    const p3 = clamp(t - 2, 0, 1)   // 0→1 during third 100vh

    /* --- Intro overlay: opaque in phase 1, fades fast at phase 2 start --- */
    introOverlay.style.opacity = String(clamp(1 - p2 * 5, 0, 1))

    /* --- Portal ---
       Phase 1: invisible, pushed below canvas (translateY = portalH)
       Phase 2: rises smoothly → bottom lands at viewport bottom (translateY = 0)
       Phase 3: scales up (1→5) and slides down (0 → 40vh) to engulf viewer */
    portalImg.style.opacity = t < 1
      ? '0'
      : t <= 2
        /* Phase 2: fade in quickly */
        ? String(clamp(p2 * 3, 0, 1))
        /* Phase 3: stay visible then fade out as user passes through */
        : String(clamp(1 - (p3 - 0.6) / 0.4, 0, 1))

    let portalY, portalScale

    if (t <= 2) {
      /* Starts at portalH below natural position, rises to 0 */
      portalY     = lerp(portalH, 0, p2)
      portalScale = 1
    } else {
      /* Zoom and slide down — more downward movement for "climbing the hill" feel */
      portalY     = p3 * vh * 0.65
      portalScale = 1 + p3 * 4
    }

    portalImg.style.transform =
      `translateX(-50%) translateY(${portalY}px) scale(${portalScale})`

    /* --- Bot narrator ---
       Enters from left between t=2.5 and t=3.
       Ease-out: fast start, gentle landing. */
    if (botWrap) {
      const botRaw      = clamp((t - 2.5) * 2, 0, 1)          // 0→1 over 0.5 t-units
      const botProgress = 1 - Math.pow(1 - botRaw, 3)          // ease-out cubic
      const botX        = lerp(-350, 0, botProgress)
      botWrap.style.transform = `translateX(${botX}px)`
      botWrap.style.opacity   = String(clamp(botRaw * 3, 0, 1)) // quick fade in
    }

    /* --- City ---
       Phase 1: completely off screen (cityHiddenY)
       Phase 2: climbs from cityHiddenY → cityPhase2EndY (tower tops just visible)
       Phase 3: climbs from cityPhase2EndY → 0 (city bottom hits canvas bottom) */
    let cityY

    if (t <= 1) {
      cityY = cityHiddenY
    } else if (t <= 2) {
      cityY = lerp(cityHiddenY, cityPhase2EndY, p2)
    } else {
      cityY = lerp(cityPhase2EndY, 0, p3)
    }

    /* Clamp: never go negative (city bottom stays at canvas bottom or below) */
    cityBg.style.transform = `translateY(${Math.max(0, cityY)}px)`
  }

  /* -------------------------------------------------------
     Wait for images to load before first geometry measurement
     ------------------------------------------------------- */
  const cityMainImg = cityBg.querySelector('.city-main-img')

  function onReady() {
    measureGeometry()
    /* Force city and portal off screen immediately */
    cityBg.style.transform  = `translateY(${cityH + 100}px)`
    portalImg.style.opacity = '0'
    tick()
  }

  const portalReady  = portalImg.complete
    ? Promise.resolve()
    : new Promise(r => portalImg.addEventListener('load', r, { once: true }))

  const cityReady = cityMainImg?.complete
    ? Promise.resolve()
    : new Promise(r => cityMainImg?.addEventListener('load', r, { once: true }))

  Promise.all([portalReady, cityReady]).then(onReady)

  /* Fallback — also run on window load */
  window.addEventListener('load', onReady, { once: true })

  /* Scroll driver */
  window.addEventListener('scroll', tick, { passive: true })

  /* Re-measure on resize (orientation change etc.) */
  window.addEventListener('resize', () => { measureGeometry(); tick() })
}

initCinematicScroll()

/* -------------------------------------------------------
   Day / Night theme toggle
   Swaps back-first.jpg ↔ back-first-dark.jpg (scene-bg)
   and city_day.jpg ↔ city_night.jpg (city-main-img).
   city-top-img hidden in night mode (city_night.jpg has its own sky).
   ------------------------------------------------------- */
function initThemeToggle() {
  const checkbox      = document.getElementById('theme-input')
  const sceneBgNight  = document.getElementById('scene-bg-night')
  const cityNightImg  = document.querySelector('.city-night-img')
  const cityTopImg    = document.querySelector('.city-top-img')

  if (!checkbox || !sceneBgNight || !cityNightImg) return

  function applyTheme(isNight) {
    /* Pure opacity crossfade — both images are always loaded,
       no src/background-image swap needed, no flash */
    const nv = isNight ? '1' : '0'
    sceneBgNight.style.opacity = nv
    cityNightImg.style.opacity = nv
    /* Hide day sky gradient strip in night mode */
    if (cityTopImg) cityTopImg.style.opacity = isNight ? '0' : '1'
  }

  checkbox.addEventListener('change', () => applyTheme(checkbox.checked))
}

initThemeToggle()
