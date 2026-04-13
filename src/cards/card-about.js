import portretUrl from '../assets/about/portret-future.jpg';

export function getAboutCard() {
  return `
    <!-- Left Content Area -->
    <div class="holo-box holo-box-large">
      <h2 class="holo-title">About Me</h2>
      <div class="holo-text-content">
        <p>Senior UX/UI Design Architect with 25 years of experience (e.g., Siemens).</p>
        <br>
        <p>My focus: scalable design systems and AI-powered Design Ops (Google Anti-gravity & Stitch). I bridge the gap between HMI ergonomics and human-AI workflows to translate complex data into clear, high-performance user experiences.</p>
      </div>
      
      <div class="holo-actions">
        <button class="holo-btn-primary">Download File</button>
        <span class="holo-btn-secondary">Encryption: Verified</span>
      </div>
    </div>

    <!-- Right Content Area: Full Height Image Box via new CSS class -->
    <div class="holo-sidebar">
      <div class="holo-box holo-box-full">
        <!-- Render the imported asset natively -->
        <div class="holo-image" style="background-image: url('${portretUrl}'); background-position: center; background-size: cover;"></div>
        <div class="holo-img-label">Visual Identification File</div>
      </div>
    </div>
  `;
}
