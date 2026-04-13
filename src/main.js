import './style.css'
import { Ribbons } from './ribbons.js'
import { getHomeCard } from './cards/card-home.js'
import { getAboutCard } from './cards/card-about.js'
import { getProjectsCard } from './cards/card-projects.js'
import { getResumeCard } from './cards/card-resume.js'
import { getContactCard } from './cards/card-contact.js'

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

  <div id="ribbons-container" style="position: fixed; inset: 0; z-index: 9999; pointer-events: none;"></div>

  <!-- 300vh wrapper — provides scrollable distance for 3 animation phases -->
  <div id="scroll-wrapper">

    <!-- Sticky canvas — pinned at top, all layers animate inside here -->
    <div id="scroll-canvas">

      <!-- Layer 0: sky backgrounds — day and night overlapping, crossfade via opacity -->
      <div id="scene-bg"       aria-hidden="true"></div>
      <div id="scene-bg-night" aria-hidden="true"></div>

      <!-- Layer 1: city group — sky gradient + city photos (day/night overlapping) -->
      <div id="city-bg">
        <img src="/city_day_top.png" class="city-top-img" alt="City Sky">
        <div class="city-photo-wrap">
          <img src="/city_day.jpg" class="city-main-img" alt="Scrap City Day">
          <img src="/city_night.jpg" class="city-night-img" id="city-night-img" alt="Scrap City Night">
        </div>
      </div>

      <!-- Laser Beam Overlay (between bot and hologram) -->
      <svg id="beam-overlay" aria-hidden="true" width="100%" height="100%" style="position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: 0; will-change: opacity; overflow: visible; mix-blend-mode: screen;">
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(0, 212, 255, 0.50)" />
            <stop offset="100%" stop-color="rgba(0, 212, 255, 0.35)" />
          </linearGradient>
        </defs>
        <polygon id="holo-beam" points="0,0 0,0 0,0" fill="url(#beam-grad)"></polygon>
        <line id="holo-beam-top" x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 212, 255, 0.6)" stroke-width="2" filter="drop-shadow(0 0 4px rgba(0,212,255,0.8))"></line>
        <line id="holo-beam-bot" x1="0" y1="0" x2="0" y2="0" stroke="rgba(0, 212, 255, 0.6)" stroke-width="2" filter="drop-shadow(0 0 4px rgba(0,212,255,0.8))"></line>
      </svg>

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

      <!-- Layer 5: Hologram UI Panel -->
      <div id="hologram-container" class="hologram-container" aria-hidden="true">
        <!-- Top navigation tabs (Separate from main panel) -->
        <nav class="hologram-tabs">
          <button class="holo-tab" data-card="about">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            About Me
          </button>
          <button class="holo-tab" data-card="projects">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            My Projects
          </button>
          <button class="holo-tab" data-card="resume">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Resume
          </button>
          <button class="holo-tab" data-card="contact">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Contact
          </button>
        </nav>

        <!-- The main separated visual card -->
        <div class="hologram-card">
          <div class="hologram-card-bg"></div>
          <div class="holo-notch-top"></div>
          <div class="holo-notch-bottom"></div>
          
          <div class="hologram-main" id="hologram-main-container" style="transition: opacity 0.3s ease;">
            <!-- Content loaded dynamically via JS -->
          </div>
        </div>

        <!-- Floating Status Badges -->
        <div class="holo-status-column holo-anim delay-2">
          <div class="holo-status-badge">City Status: <span class="text-green">Stable</span></div>
          <div class="holo-status-badge">System Time: <span class="text-cyan">01:24</span></div>
          <div class="holo-status-badge">Connection: <span class="text-green">Online</span></div>
        </div>
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
  const portalImg = document.getElementById('portal-img')
  const cityBg = document.getElementById('city-bg')
  const introOverlay = document.getElementById('intro-overlay')
  const botWrap = document.getElementById('bot-wrap')
  const hologramContainer = document.getElementById('hologram-container')

  if (!portalImg || !cityBg || !introOverlay) return

  /* Start bot off-screen to the left */
  if (botWrap) botWrap.style.transform = 'translateX(-350px)'

  /* Geometry — measured after images load, refreshed on resize */
  let portalH = 0   // rendered height of portal image
  let cityH = 0   // total height of city-bg stack (top.png + jpg)
  let vh = 0   // viewport height

  /* Key Y offsets (all in pixels, translateY values for city-bg) */
  let cityHiddenY = 0  // completely below viewport (phase 1)
  let cityPhase2EndY = 0  // only tower tops visible above portal hill (phase 2 end)

  function measureGeometry() {
    vh = window.innerHeight
    portalH = portalImg.offsetHeight   // depends on viewport width
    cityH = cityBg.scrollHeight      // sum of both images' rendered heights

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
    const t = window.scrollY / (window.innerHeight * 1.5)
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
      portalY = lerp(portalH, 0, p2)
      portalScale = 1
    } else {
      /* Zoom and slide down — more downward movement for "climbing the hill" feel */
      portalY = p3 * vh * 0.65
      portalScale = 1 + p3 * 4
    }

    portalImg.style.transform =
      `translateX(-50%) translateY(${portalY}px) scale(${portalScale})`

    /* --- Bot narrator ---
       Enters from left between t=2.5 and t=3.
       Ease-out: fast start, gentle landing. */
    if (botWrap) {
      const botRaw = clamp((t - 2.5) * 2, 0, 1)          // 0→1 over 0.5 t-units
      const botProgress = 1 - Math.pow(1 - botRaw, 3)          // ease-out cubic
      const botX = lerp(-350, 0, botProgress)
      botWrap.style.transform = `translateX(${botX}px)`
      botWrap.style.opacity = String(clamp(botRaw * 3, 0, 1)) // quick fade in
    }

    /* --- Hologram Interface ---
       Fades in and slides up slightly after bot is fully in place (t > 2.8)
    */
    if (hologramContainer) {
      const holoRaw = clamp((t - 2.8) * 5, 0, 1) // 0→1 quickly at the very end

      // Toggle seq-boot class for time-based animation sequence
      if (holoRaw <= 0.01) {
        hologramContainer.style.display = 'none'
        hologramContainer.style.opacity = '0'
        if (hologramContainer.classList.contains('seq-boot')) {
          hologramContainer.classList.remove('seq-boot');
        }
      } else {
        hologramContainer.style.display = 'block'
        // The container is immediately fully visible, the children handle their own sequenced animated opacity
        hologramContainer.style.opacity = '1'
        if (!hologramContainer.classList.contains('seq-boot')) {
          hologramContainer.classList.add('seq-boot');
        }
      }

      // Slight vertical rise effect
      const holoY = clamp(50 * (1 - holoRaw), 0, 50)
      hologramContainer.style.transform = `translate(-50%, calc(-50% + ${holoY}px))`
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
     Continuous Render Loop (Bot Bobbing & Laser Tracking)
     ------------------------------------------------------- */
  const botImg = document.getElementById('bot-img')
  const beamOverlay = document.getElementById('beam-overlay')
  const holoBeam = document.getElementById('holo-beam')
  const beamTop = document.getElementById('holo-beam-top')
  const beamBot = document.getElementById('holo-beam-bot')
  const cardEl = document.querySelector('.hologram-card')

  let startTimestamp = null
  let botBobY = 0
  let isBooting = false
  let sequenceStartTime = 0

  function renderLoop(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp
    const elapsed = timestamp - startTimestamp

    // Simulate the 3.2s float-bob animation via JS
    const cycle = (elapsed % 3200) / 3200
    botBobY = -14 * (1 - Math.cos(cycle * Math.PI * 2)) / 2

    if (botImg) {
      botImg.style.transform = `translateY(${botBobY}px)`
    }

    if (hologramContainer && beamOverlay && holoBeam) {
      const holoOpacity = parseFloat(hologramContainer.style.opacity || '0')
      
      const hasBootClass = hologramContainer.classList.contains('seq-boot')
      if (hasBootClass && !isBooting) {
        isBooting = true
        sequenceStartTime = timestamp
      } else if (!hasBootClass && isBooting) {
        isBooting = false
        sequenceStartTime = 0
      }
      
      const seqElapsed = isBooting ? (timestamp - sequenceStartTime) : 0

      if (holoOpacity <= 0.01 || !cardEl || !botImg) {
        beamOverlay.style.opacity = '0'
      } else {
        beamOverlay.style.opacity = String(holoOpacity)

        // Measure coordinates dynamically
        const botRect = botImg.getBoundingClientRect()
        const cardRect = cardEl.getBoundingClientRect()

        // Bot's right small eye approximation (adjusted 30px higher, 3px left per user feedback)
        const eyeX = botRect.left + botRect.width * 0.65 - 7
        const eyeY = botRect.top + botRect.height * 0.45 - 35

        // Hologram left edge corners
        const targetTopX = cardRect.left + 17
        const targetTopY = cardRect.top
        const targetBotX = cardRect.left
        const targetBotY = cardRect.bottom - 19
        
        // Animate the beam shooting out fast over the first 500ms
        let currentTopX = targetTopX
        let currentTopY = targetTopY
        let currentBotX = targetBotX
        let currentBotY = targetBotY
        
        if (isBooting && seqElapsed < 1000) {
          // Beam waits 500ms, then shoots out from 500ms -> 1000ms
          // This perfectly times the impact right before the card unfolds
          const localElapsed = Math.max(0, seqElapsed - 500)
          const p = Math.min(localElapsed / 500, 1)
          const eased = 1 - Math.pow(1 - p, 4) // Ease-out Quart curve
          
          currentTopX = lerp(eyeX, targetTopX, eased)
          currentTopY = lerp(eyeY, targetTopY, eased)
          currentBotX = lerp(eyeX, targetBotX, eased)
          currentBotY = lerp(eyeY, targetBotY, eased)
        }

        // Update SVG Polygon and edge lines
        holoBeam.setAttribute('points', `${eyeX},${eyeY} ${currentTopX},${currentTopY} ${currentBotX},${currentBotY}`)
        beamTop.setAttribute('x1', String(eyeX))
        beamTop.setAttribute('y1', String(eyeY))
        beamTop.setAttribute('x2', String(currentTopX))
        beamTop.setAttribute('y2', String(currentTopY))

        beamBot.setAttribute('x1', String(eyeX))
        beamBot.setAttribute('y1', String(eyeY))
        beamBot.setAttribute('x2', String(currentBotX))
        beamBot.setAttribute('y2', String(currentBotY))
      }
    }

    requestAnimationFrame(renderLoop)
  }

  /* -------------------------------------------------------
     Wait for images to load before first geometry measurement
     ------------------------------------------------------- */
  const cityMainImg = cityBg.querySelector('.city-main-img')

  function onReady() {
    measureGeometry()
    /* Force city and portal off screen immediately */
    cityBg.style.transform = `translateY(${cityH + 100}px)`
    portalImg.style.opacity = '0'
    tick()
    requestAnimationFrame(renderLoop)
  }

  const portalReady = portalImg.complete
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
  const checkbox = document.getElementById('theme-input')
  const sceneBgNight = document.getElementById('scene-bg-night')
  const cityNightImg = document.querySelector('.city-night-img')
  const cityTopImg = document.querySelector('.city-top-img')

  if (!checkbox || !sceneBgNight || !cityNightImg) return

  checkbox.addEventListener('change', (e) => {
    const isNight = e.target.checked
    sceneBgNight.style.opacity = isNight ? '1' : '0'
    cityNightImg.style.opacity = isNight ? '1' : '0'
    if (cityTopImg) {
      cityTopImg.style.opacity = isNight ? '0' : '1'
    }
  })
}

initThemeToggle()

/* -------------------------------------------------------
   Hologram UI Component Loader & Tab Manager
   ------------------------------------------------------- */
function initHologramTabs() {
  console.log("=== HOLOGRAM SYSTEM INITIALIZED ===");
  const initialMain = document.getElementById('hologram-main-container');
  
  if (initialMain) {
    initialMain.innerHTML = getHomeCard();
  } else {
    console.warn("hologram-main-container not found on load");
  }
  
  const initialTabs = document.querySelectorAll('.holo-tab');
  if (initialTabs.length) {
    initialTabs.forEach(t => t.classList.remove('active'));
  }

  // Use event delegation on the document body to guarantee we capture the clicks
  document.body.addEventListener('click', (e) => {
    const tab = e.target.closest('.holo-tab');
    const bot = e.target.closest('#bot-wrap');
    
    // Proceed if either a tab or the bot was clicked
    if (!tab && !bot) return;
    
    e.preventDefault();
    
    // Target defaults to 'home' if bot was clicked instead of a tab
    const targetCard = tab ? tab.getAttribute('data-card') : 'home';
    console.log("Navigation triggered:", targetCard);

    // Audio Effect
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (err) {}

    // Manage Active States
    const allTabs = document.querySelectorAll('.holo-tab');
    allTabs.forEach(t => t.classList.remove('active'));
    if (tab) {
      tab.classList.add('active');
    }
    
    const dynamicMain = document.getElementById('hologram-main-container');
    if (!dynamicMain) return;
    
    // Fade Out Transition
    dynamicMain.style.opacity = '0';
    
    setTimeout(() => {
      // Swap Component Content
      if (targetCard === 'about') {
        dynamicMain.innerHTML = getAboutCard();
      } else if (targetCard === 'projects') {
        dynamicMain.innerHTML = getProjectsCard();
      } else if (targetCard === 'resume') {
        dynamicMain.innerHTML = getResumeCard();
      } else if (targetCard === 'contact') {
        dynamicMain.innerHTML = getContactCard();
      } else if (targetCard === 'home') {
        dynamicMain.innerHTML = getHomeCard();
      } else {
        // Fallback Placeholder
        dynamicMain.innerHTML = `
          <div class="holo-box holo-box-large" style="grid-column: span 2;">
            <h2 class="holo-title">Awaiting Data</h2>
            <div class="holo-text-content">
              <p>The neural pathway to this section has not been established yet.</p>
            </div>
          </div>
        `;
      }
      
      // Fade In Transition
      dynamicMain.style.opacity = '1';
    }, 300);
  });
}

initHologramTabs()

/* -------------------------------------------------------
   Cursor Animation (Ribbons)
   ------------------------------------------------------- */
const ribbonsContainer = document.getElementById('ribbons-container')
if (ribbonsContainer) {
  new Ribbons(ribbonsContainer, {
    colors: ['#5227FF', '#1dc734'],
    speedMultiplier: 0.5,
    maxAge: 500,
    enableFade: true,
    enableShaderEffect: false
  })
}
