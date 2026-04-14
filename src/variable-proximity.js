export class VariableProximity {
  constructor(element, options = {}) {
    this.container = element;
    if (!this.container) return;

    this.options = {
      fromSettings: options.fromSettings || "'wght' 300",
      toSettings: options.toSettings || "'wght' 900",
      radius: options.radius || 100,
      falloff: options.falloff || 'linear'
    };
    
    // Initialize out of bounds
    this.mousePosition = { x: -9999, y: -9999 };
    this.lastPosition = { x: null, y: null };
    this.letterElements = [];
    
    this.parsedFrom = this.parseSettings(this.options.fromSettings);
    this.parsedTo = this.parseSettings(this.options.toSettings);
    this.parsedSettingsInfo = Array.from(this.parsedFrom.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: this.parsedTo.get(axis) ?? fromValue
    }));
    
    this.initHTML();
    this.bindEvents();
    this.loop();
  }
  
  parseSettings(settingsStr) {
    const map = new Map();
    settingsStr.split(',').map(s => s.trim()).forEach(s => {
      const parts = s.split(' ');
      if (parts.length === 2) {
        map.set(parts[0].replace(/['"]/g, ''), parseFloat(parts[1]));
      }
    });
    return map;
  }
  
  initHTML() {
    const contentNodes = Array.from(this.container.childNodes);
    this.container.innerHTML = '';
    
    contentNodes.forEach(node => {
      if (node.nodeType === 3) { // Text node
        // Replace newlines and excessive whitespace to prevent flex/inline-block alignment issues
        let text = node.textContent.replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
        if (text === '') return; // Skip empty whitespace nodes
        
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
          if (word.length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            
            word.split('').forEach(letter => {
              const letterSpan = document.createElement('span');
              letterSpan.style.display = 'inline-block';
              letterSpan.style.transition = 'none';
              letterSpan.style.fontVariationSettings = this.options.fromSettings;
              // Also apply standard font-weight for non-variable font fallback
              if (this.parsedFrom.has('wght')) {
                 letterSpan.style.fontWeight = this.parsedFrom.get('wght');
              }
              letterSpan.textContent = letter;
              wordSpan.appendChild(letterSpan);
              this.letterElements.push(letterSpan);
            });
            this.container.appendChild(wordSpan);
          }
          
          if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.style.display = 'inline-block';
            space.innerHTML = '&nbsp;';
            this.container.appendChild(space);
          }
        });
      } else {
        // Element (like <br>)
        this.container.appendChild(node.cloneNode(true));
      }
    });
  }
  
  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mousePosition = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
  }
  
  calculateFalloff(distance) {
    const norm = Math.min(Math.max(1 - distance / this.options.radius, 0), 1);
    switch (this.options.falloff) {
      case 'exponential': return norm ** 2;
      case 'gaussian': return Math.exp(-((distance / (this.options.radius / 2)) ** 2) / 2);
      case 'linear': default: return norm;
    }
  }
  
  loop() {
    requestAnimationFrame(() => this.loop());
    
    const x = this.mousePosition.x;
    const y = this.mousePosition.y;
    
    if (this.lastPosition.x === x && this.lastPosition.y === y) return;
    this.lastPosition = { x, y };

    this.letterElements.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt((x - letterCenterX) ** 2 + (y - letterCenterY) ** 2);
      
      if (distance >= this.options.radius) {
        letter.style.fontVariationSettings = this.options.fromSettings;
        if (this.parsedFrom.has('wght')) {
           letter.style.fontWeight = this.parsedFrom.get('wght');
        }
        return;
      }
      
      const falloffValue = this.calculateFalloff(distance);
      let newFontWeight = null;
      
      const newSettings = this.parsedSettingsInfo.map(({ axis, fromValue, toValue }) => {
        const interpolated = fromValue + (toValue - fromValue) * falloffValue;
        if (axis === 'wght') newFontWeight = interpolated;
        return `"${axis}" ${interpolated}`;
      }).join(', ');
      
      letter.style.fontVariationSettings = newSettings;
      if (newFontWeight !== null) letter.style.fontWeight = newFontWeight;
    });
  }
}
