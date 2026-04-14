export function getTechCard() {
  return `
    <!-- Left Content Area -->
    <div class="holo-box holo-box-large">
      <h2 class="holo-title">System Architecture</h2>
      <div class="holo-text-content" style="padding-right: 12px; overflow-y: auto;">
        <div style="display: flex; flex-direction: column; gap: var(--space-lg);">
          
          <div style="border-left: 2px solid var(--color-cyan); padding-left: var(--space-md);">
            <h3 style="color: var(--color-cyan); font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Interface Strategy</h3>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; line-height: 1.6;">Cinematic scroll-based architecture designed for highly immersive user progression. Features hardware-accelerated 3D transforms, custom Variable-Proximity typography, and WebGL-inspired canvas ribbons.</p>
          </div>

          <div style="border-left: 2px solid var(--color-magenta); padding-left: var(--space-md);">
            <h3 style="color: var(--color-magenta); font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">AI Collaboration</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: var(--color-text); font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
              <li><span style="color: var(--color-text-muted); display: inline-block; width: 100px;">Lead Agent:</span> <strong>Google Antigravity</strong></li>
              <li><span style="color: var(--color-text-muted); display: inline-block; width: 100px;">LLM Core 1:</span> <strong>Gemini 3.1 Pro</strong></li>
              <li><span style="color: var(--color-text-muted); display: inline-block; width: 100px;">LLM Core 2:</span> <strong>Claude Sonnet 4.6</strong></li>
            </ul>
          </div>

          <div style="border-left: 2px solid var(--color-gold); padding-left: var(--space-md);">
            <h3 style="color: var(--color-gold); font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Core Infrastructure</h3>
            
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
              <span style="background: rgba(240, 160, 48, 0.15); border: 1px solid rgba(240, 160, 48, 0.5); padding: 4px 10px; border-radius: 2px; font-size: 0.70rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold);">HTML5</span>
              <span style="background: rgba(240, 160, 48, 0.15); border: 1px solid rgba(240, 160, 48, 0.5); padding: 4px 10px; border-radius: 2px; font-size: 0.70rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold);">Vanilla CSS</span>
              <span style="background: rgba(240, 160, 48, 0.15); border: 1px solid rgba(240, 160, 48, 0.5); padding: 4px 10px; border-radius: 2px; font-size: 0.70rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold);">Vanilla JS</span>
              <span style="background: rgba(240, 160, 48, 0.15); border: 1px solid rgba(240, 160, 48, 0.5); padding: 4px 10px; border-radius: 2px; font-size: 0.70rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--color-gold);">Vite Setup</span>
            </div>
            
            <ul style="list-style: none; padding: 0; margin: 0; color: var(--color-text); font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
              <li><span style="color: var(--color-text-muted); display: inline-block; width: 140px;">Version Control:</span> <strong>GitHub Repository</strong></li>
              <li><span style="color: var(--color-text-muted); display: inline-block; width: 140px;">Deployment Node:</span> <strong>Vercel Edge Network</strong></li>
            </ul>
          </div>

          <!-- Pseudo Diagram -->
          <div style="background: rgba(0, 212, 255, 0.03); border: 1px solid rgba(0, 212, 255, 0.2); padding: 16px; font-family: monospace; font-size: 0.7rem; color: var(--color-cyan); white-space: pre; line-height: 1.4; overflow-x: auto; border-radius: 2px; user-select: none;">
[ CLIENT ] ===&gt; [ Vercel Edge ] ---&gt; { Vanilla DOM Engine }
                                           |
                       +-------------------+-------------------+
                       |                   |                   |
               [ Scroll Driver ]   [ Hologram UI ]    [ Proximity Font FX ]
          </div>

        </div>
      </div>
      
      <div class="holo-actions" style="margin-top: var(--space-md);">
        <span class="holo-btn-secondary">Tech Stack Verified</span>
      </div>
    </div>

    <!-- Right Content Area -->
    <div class="holo-sidebar">
      <div class="holo-box holo-box-full">
        <div class="holo-image" style="background-image: url('/index.jpg'); background-position: center; background-size: cover; border-color: var(--color-cyan);"></div>
        <div class="holo-img-label">Project Structure</div>
      </div>
    </div>
  `;
}
