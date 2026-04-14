export function getProjectDetailCard() {
  return `
    <div class="holo-box holo-box-large" style="grid-column: span 2;">
      <h2 class="holo-title" style="margin-bottom: 2rem;">Archive Request</h2>
      
      <div class="holo-text-content" style="text-align: center; margin-top: 40px; margin-bottom: 60px;">
        <h3 style="color: var(--color-cyan); font-size: 1.6rem; letter-spacing: 3px; font-family: var(--font-display);">COMING SOON...</h3>
        <p style="margin-top: 20px; opacity: 0.7; font-size: 1.1rem;">This project file is currently being decrypted and organized.</p>
        <div style="margin-top: 30px; display: flex; justify-content: center; gap: 10px;">
          <div style="width: 8px; height: 8px; background: var(--color-cyan); border-radius: 50%; opacity: 0.5; animation: pulse 1s infinite;"></div>
          <div style="width: 8px; height: 8px; background: var(--color-cyan); border-radius: 50%; opacity: 0.5; animation: pulse 1s infinite 0.2s;"></div>
          <div style="width: 8px; height: 8px; background: var(--color-cyan); border-radius: 50%; opacity: 0.5; animation: pulse 1s infinite 0.4s;"></div>
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      </style>
      
      <div class="holo-actions" style="justify-content: center;">
        <button class="holo-btn-primary" data-card="projects">Return to Project Archives</button>
      </div>
    </div>
  `;
}
