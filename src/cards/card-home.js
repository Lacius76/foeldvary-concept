import blueprintUrl from '../assets/bot-buleprint.jpg';

export function getHomeCard() {
  return `
    <!-- Left Content Area -->
    <div class="holo-box holo-box-large">
      <h2 class="holo-title">Welcome Protocol - Initialized</h2>
      <div class="holo-text-content">
        <p>Hello, I am AI Bot-1000.</p>
        <br>
        <p>I am glad you made it here. I will guide you through the contents of this concept, operating as your primary navigational interface.</p>
        <br>
        <p>System status is nominal. Energy levels at 98%. All local sync protocols are active and standing by for user input.</p>
      </div>
      
      <div class="holo-actions">
        <button class="holo-btn-primary">Continue...</button>
        <span class="holo-btn-secondary">Next Page</span>
      </div>
    </div>

    <!-- Right Content Area -->
    <div class="holo-sidebar">
      <div class="holo-box holo-box-full">
        <div class="holo-image" style="background-image: url('${blueprintUrl}'); background-position: center; background-size: cover; border-color: var(--color-cyan);"></div>
        <div class="holo-img-label">AI Bot-1000 Blueprint</div>
      </div>
    </div>
  `;
}
