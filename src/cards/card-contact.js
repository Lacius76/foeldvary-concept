export function getContactCard() {
  return `
    <div class="holo-box holo-box-large holo-contact-layout" style="grid-column: span 2; display: flex; flex-direction: column; height: 100%;">
      
      <!-- Main Header with Mini Uplink Buttons -->
      <div style="margin-bottom: var(--space-md); padding-bottom: var(--space-md); border-bottom: 1px solid rgba(0, 212, 255, 0.2); display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: var(--space-md);">
        
        <div style="flex-shrink: 0;">
          <h2 class="holo-title" style="margin-bottom: 4px;">Transmission Link</h2>
          <span style="color: var(--color-text-muted); font-family: var(--font-ui); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px;">Frequency: Open</span>
        </div>

        <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; justify-content: flex-end;">
          <a href="mailto:foeldvary@gmail.com" class="holo-box holo-box-interactive" style="padding: 6px 16px; text-decoration: none; border-radius: 2px;">
            <div style="color: var(--color-text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">Email</div>
          </a>

          <a href="https://www.linkedin.com/in/foldvary-laszlo/" target="_blank" class="holo-box holo-box-interactive" style="padding: 6px 16px; text-decoration: none; border-radius: 2px; margin-right: 8px;">
            <div style="color: var(--color-text-muted); font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">LinkedIn</div>
          </a>

          <!-- Sub Tabs -->
          <button data-target="sub-calendar" class="holo-box holo-box-interactive subtab-btn active-subtab" style="padding: 6px 16px; border-radius: 2px; border-color: rgba(0, 212, 255, 0.8); background: rgba(0, 212, 255, 0.15); cursor: pointer;">
            <div style="color: var(--color-cyan); font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Book a Call</div>
          </button>
          
          <button data-target="sub-message" class="holo-box holo-box-interactive subtab-btn" style="padding: 6px 16px; border-radius: 2px; cursor: pointer;">
            <div style="color: var(--color-cyan); font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</div>
          </button>
        </div>

      </div>

      <!-- Bottom Area: Calendar (Full Width) -->
      <div id="sub-calendar" class="holo-cal-wrapper sub-content" style="flex: 1; border: 1px solid rgba(0, 212, 255, 0.3); background: var(--color-bg); overflow: hidden; border-radius: 2px; position: relative; min-height: 250px; display: block;">
        <iframe 
          src="https://cal.com/laszlo.ui/30min?embed=true&theme=dark"
          style="width: 100%; height: 100%; border: none;"
        ></iframe>
      </div>

      <!-- Bottom Area: Direct Message Form -->
      <div id="sub-message" class="holo-cal-wrapper sub-content" style="flex: 1; border: 1px solid rgba(0, 212, 255, 0.3); background: rgba(5, 12, 26, 0.5); overflow-y: auto; overflow-x: hidden; border-radius: 2px; position: relative; min-height: 250px; display: none; padding: var(--space-lg);">
        <form onsubmit="event.preventDefault(); alert('Transmission successful. Awaiting server response.'); this.reset();" style="display: flex; flex-direction: column; gap: var(--space-md); min-height: 100%;">
          
          <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: var(--space-xl); flex: 1;">
            
            <!-- Left Column: Inputs & Text -->
            <div style="display: flex; flex-direction: column; gap: var(--space-md);">
              <input type="text" placeholder="Designation / Name" style="background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 2px; color: var(--color-text); padding: 12px; font-family: var(--font-ui); font-size: 0.9rem; outline: none;" required />
              <input type="email" placeholder="Return Address (Email)" style="background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 2px; color: var(--color-text); padding: 12px; font-family: var(--font-ui); font-size: 0.9rem; outline: none;" required />
              <input type="text" placeholder="Subject" style="background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 2px; color: var(--color-text); padding: 12px; font-family: var(--font-ui); font-size: 0.9rem; outline: none;" required />
              
              <div style="margin-top: auto; padding-top: var(--space-md); color: var(--color-text-muted); font-family: var(--font-ui); font-size: 0.85rem; line-height: 1.6; border-top: 1px solid rgba(0, 212, 255, 0.1);">
                <p style="margin: 0; padding-bottom: 4px; color: var(--color-cyan); font-weight: 500;">Have a project in mind?</p>
                Looking for a UI partner? Send me a message and I'll get back to you within 24 hours.
              </div>
            </div>

            <!-- Right Column: Textarea & Submit -->
            <div style="display: flex; flex-direction: column; gap: var(--space-md);">
              <textarea placeholder="Message payload..." style="flex: 1; background: rgba(0, 212, 255, 0.05); border: 1px solid rgba(0, 212, 255, 0.3); border-radius: 2px; color: var(--color-text); padding: 12px; font-family: var(--font-ui); font-size: 0.9rem; outline: none; min-height: 100px; resize: none;" required></textarea>
              <button type="submit" class="holo-btn-primary" style="align-self: flex-end; padding: 10px 24px;">Send Message</button>
            </div>

          </div>

          <style>
            #sub-message input:focus, #sub-message textarea:focus { border-color: rgba(0, 212, 255, 0.8) !important; box-shadow: 0 0 8px rgba(0, 212, 255, 0.2); }
          </style>
        </form>
      </div>

    </div>
  `;
}
