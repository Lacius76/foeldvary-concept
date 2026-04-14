import amaticImg from '../assets/projects/amatic.jpg';
import ewaImg from '../assets/projects/ewa-hero.jpg';
import foeldvaryImg from '../assets/projects/foeldvary-com.jpg';
import funworldImg from '../assets/projects/funworld.jpg';
import greentubeImg from '../assets/projects/greentube.jpg';
import shadowcartelsImg from '../assets/projects/shadowcartels.jpg';
import siemensImg from '../assets/projects/siemens-etm.jpg';

export function getProjectsCard() {
  const projects = [
    { title: 'Foeldvary.com', img: foeldvaryImg },
    { title: 'eWa App', img: ewaImg },
    { title: 'Shadow Cartels', img: shadowcartelsImg },
    { title: 'Siemens / ETM', img: siemensImg },
    { title: 'Greentube', img: greentubeImg },
    { title: 'Amatic', img: amaticImg },
    { title: 'Photoplay', img: funworldImg }
  ];

  const gridItems = projects.map(p => `
    <div class="holo-project-container" data-card="project-detail">
      <a class="holo-project-quadrant" href="#"></a>
      <a class="holo-project-quadrant" href="#"></a>
      <a class="holo-project-quadrant" href="#"></a>
      <a class="holo-project-quadrant" href="#"></a>
      <div class="holo-project-card holo-box">
        <div class="holo-image" style="background-image: url('${p.img}'); background-position: center; background-size: cover; height: 140px;"></div>
        <div class="holo-img-label">${p.title}</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="holo-box holo-box-large" style="grid-column: span 2; display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
        <h2 class="holo-title" style="margin-bottom: 0;">Project Archives</h2>
        <span class="holo-btn-secondary">Awaiting Drilldown Links</span>
      </div>
      <div class="holo-projects-grid">
        ${gridItems}
      </div>
    </div>
  `;
}
