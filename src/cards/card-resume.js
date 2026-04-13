export function getResumeCard() {
  return `
    <div class="holo-box holo-box-large holo-resume-layout" style="grid-column: span 2;">
      <!-- Main Header -->
      <div style="margin-bottom: var(--space-xl); padding-bottom: var(--space-md); border-bottom: 1px solid rgba(0, 212, 255, 0.2);">
        <h2 class="holo-title" style="margin-bottom: 4px;">LÁSZLÓ FÖLDVÁRY</h2>
        <div style="color: var(--color-cyan); font-family: var(--font-display); letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase;">
          SENIOR PRODUCT DESIGNER <span style="color: var(--color-text-muted); margin: 0 8px;">|</span> UI/UX & DESIGN SYSTEMS
        </div>
      </div>

      <div class="holo-resume-grid">
        
        <!-- Left Column: Metrics & Skills -->
        <div class="holo-resume-sidebar">

          <h3 class="holo-subtitle">Language Protocol</h3>
          <div class="holo-lang-container">
            <div class="holo-lang-item">
              <span>German (Native Proficiency)</span>
              <div class="holo-lang-bar"><div class="holo-lang-fill" style="width: 100%;"></div></div>
            </div>
            <div class="holo-lang-item">
              <span>Hungarian (Native Language)</span>
              <div class="holo-lang-bar"><div class="holo-lang-fill" style="width: 100%;"></div></div>
            </div>
            <div class="holo-lang-item">
              <span>English (Fluent in speaking)</span>
              <div class="holo-lang-bar"><div class="holo-lang-fill" style="width: 90%;"></div></div>
            </div>
            <div class="holo-lang-item">
              <span>Romanian (Fluent in speaking)</span>
              <div class="holo-lang-bar"><div class="holo-lang-fill" style="width: 85%;"></div></div>
            </div>
          </div>
          
          <h3 class="holo-subtitle" style="margin-top: var(--space-xl);">Core Competencies</h3>
          <div class="holo-tags-container">
            <span class="holo-tag">User-Centered Design</span>
            <span class="holo-tag">Design Systems (Atomic)</span>
            <span class="holo-tag">Agile Design (Scrum)</span>
            <span class="holo-tag">Rapid Prototyping</span>
            <span class="holo-tag">HMI & Touch Ergonomie</span>
            <span class="holo-tag">Design-to-Dev Handoff</span>
          </div>

          <h3 class="holo-subtitle" style="margin-top: var(--space-xl);">Creative Tech</h3>
          <div class="holo-tags-container">
            <span class="holo-tag">Figma</span>
            <span class="holo-tag">Photoshop / Illustrator</span>
            <span class="holo-tag">After Effects / Rive / Cavalry</span>
            <span class="holo-tag">Blender / Affinity</span>
          </div>

          <h3 class="holo-subtitle" style="margin-top: var(--space-xl);">AI & Cloud Workflows</h3>
          <div class="holo-tags-container">
            <span class="holo-tag">Google Anti-gravity</span>
            <span class="holo-tag">Google Stitch</span>
            <span class="holo-tag">Gemini, Claude, Grok</span>
            <span class="holo-tag">NotebookLM</span>
            <span class="holo-tag">GitHub, Netlify</span>
          </div>
          
        </div>

        <!-- Right Column: Career Timeline -->
        <div class="holo-resume-timeline">
          <h3 class="holo-subtitle">Career Progression</h3>
          
          <div class="holo-timeline-path">
            
            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2022 - Present</div>
                <div class="holo-timeline-title">Senior Product Designer</div>
                <div class="holo-timeline-company">Self-Initiated R&D</div>
                <p class="holo-timeline-desc"><strong>Focus: AI-Augmented Design-to-Code Operations.</strong><br>• Analyzing complex app logic with NotebookLM; rapid prototyping via Google Stitch as a replacement for traditional Figma workflows.<br>• Built an end-to-end pipeline in Google Anti-gravity: Web → Flutter (Native Android), Gemini-powered code optimization, deployment via GitHub / Netlify.<br>• Prototype & Details: eWa-app.vercel.app</p>
              </div>
            </div>

            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2019 - 2022</div>
                <div class="holo-timeline-title">Senior UI/UX Designer</div>
                <div class="holo-timeline-company">Siemens-ETM (WinCC OA) — Eisenstadt</div>
                <p class="holo-timeline-desc"><strong>Responsible for UX/UI design of WinCC OA.</strong><br>• Standardization of complex Design Systems (Widget-Library) with over 270 components, reducing implementation time by approximately 40%.<br>• Ensuring efficient Design-to-Development Handoff in an agile Scrum environment to minimize friction in implementing complex logic.</p>
              </div>
            </div>

            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2008 - 2018</div>
                <div class="holo-timeline-title">Senior UI Designer & Art Lead</div>
                <div class="holo-timeline-company">Greentube (Novomatic) — Wien</div>
                <p class="holo-timeline-desc"><strong>Decisive shaping of global UI standards for market-leading casino products over a decade.</strong><br>• Lead development of UI systems for over 50+ high-performance slot games with focus on Cross-Platform Usability (Mobile-First).<br>• Close collaboration with Technical Leads to optimize Asset Pipelines and UI performance.</p>
              </div>
            </div>

            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2007 - 2008</div>
                <div class="holo-timeline-title">UI-Designer</div>
                <div class="holo-timeline-company">Altova — Wien</div>
                <p class="holo-timeline-desc">• Systematic Icon Design: Creation of cross-platform desktop icon sets in multi-resolution formats (including monochrome adaptations for specific UI states).<br>• Web Interface Optimization: Visual maintenance and optimization of web assets for corporate presence.</p>
              </div>
            </div>

            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2003 - 2007</div>
                <div class="holo-timeline-title">UI Designer & Concept Artist</div>
                <div class="holo-timeline-company">Amatic Industries — Regau</div>
                <p class="holo-timeline-desc"><strong>Focus on design research and integration of motion graphics into cohesive game worlds.</strong><br>• Thematic Research: Conducting intensive cultural-historical studies (e.g., Egyptology for "Pharaoh", Norse Mythology for "Viking") to create authentic graphical worlds.</p>
              </div>
            </div>

            <div class="holo-timeline-item">
              <div class="holo-timeline-node"></div>
              <div class="holo-timeline-content">
                <div class="holo-timeline-date">2000 - 2003</div>
                <div class="holo-timeline-title">UI Designer / Ergonomics-Pioneer</div>
                <div class="holo-timeline-company">Funworld AG — Schörfling am Attersee</div>
                <p class="holo-timeline-desc">• Interface Ergonomics: In-depth experience in element placement to avoid occlusion by the human hand (Hand-Occlusion-UX) – a principle that is essential in mobile apps today.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
}
