import portretUrl from '../assets/about/portret-future.jpg';

export function getAboutCard() {
  return `
    <!-- Left Content Area -->
    <div class="holo-box holo-box-large">
      <h2 class="holo-title">About Me</h2>
      <div class="holo-text-content">
        <p>Balancing 25 years of design legacy with future AI.</p>
        <br>
        <p>I am a Senior UI/UX Designer based in Vienna, specialized in creating high-stakes interfaces for industrial systems and AI-augmented product systems.</p>
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
