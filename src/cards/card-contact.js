export function getContactCard() {
  return `
    <div class="holo-box holo-box-large holo-contact-layout" style="grid-column: span 2; display: flex; flex-direction: column; height: 100%;">
      
      <!-- Main Header with Mini Uplink Buttons -->
      <div style="margin-bottom: var(--space-md); padding-bottom: var(--space-md); border-bottom: 1px solid rgba(0, 212, 255, 0.2); display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
        
        <div>
          <h2 class="holo-title" style="margin-bottom: 4px;">Transmission Link</h2>
          <span style="color: var(--color-text-muted); font-family: var(--font-ui); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px;">Frequency: Open</span>
        </div>

        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
          <a href="mailto:hello@foeldvary.com" class="holo-box holo-box-interactive" style="padding: 6px 16px; text-decoration: none; border-radius: 2px;">
            <div style="color: var(--color-cyan); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Email</div>
          </a>

          <a href="https://linkedin.com/" target="_blank" class="holo-box holo-box-interactive" style="padding: 6px 16px; text-decoration: none; border-radius: 2px;">
            <div style="color: var(--color-cyan); font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">LinkedIn Node</div>
          </a>

          <a href="https://foeldvary.com" target="_blank" class="holo-box holo-box-interactive" style="padding: 6px 16px; text-decoration: none; border-radius: 2px;">
            <div style="color: var(--color-cyan); font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Primary Server</div>
          </a>
        </div>

      </div>

      <!-- Bottom Area: Calendar (Full Width) -->
      <div class="holo-cal-wrapper" style="flex: 1; border: 1px solid rgba(0, 212, 255, 0.3); background: var(--color-bg); overflow: hidden; border-radius: 2px; position: relative; min-height: 250px;">
        <iframe 
          src="https://cal.com/laszlo.ui/30min?embed=true&theme=dark"
          style="width: 100%; height: 100%; border: none;"
        ></iframe>
      </div>

    </div>
  `;
}
