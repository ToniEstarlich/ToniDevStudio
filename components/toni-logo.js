// How use the component?
// <toni-logo></toni-logo>
// <script src="components/toni-logo.js" defer></script>

//use the size attribute to set the size: "navbar", "small", "medium", "large"

// <toni-logo size="medium"></toni-logo>
// <script src="components/toni-logo.js" defer></script>

const SIZES = {
  navbar: { base: 60, circle: 12, radius: 22, font: 0 },
  small:  { base: 120, circle: 24, radius: 42, font: 18 },
  medium: { base: 200, circle: 50, radius: 60, font: 34 },
  large:  { base: 300, circle: 70, radius: 90, font: 48 }
};

class ToniLogo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.positionCircles();
  }

  getSizeConfig() {
    const size = this.getAttribute("size") || "medium";
    return SIZES[size] || SIZES.medium;
  }

  render() {
    const { base, circle, font } = this.getSizeConfig();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .logo-circle {
          position: relative;
          width: ${base}px;
          height: ${base}px;
          opacity: 0;
          transform: scale(0.6);
          animation: zoomIn 1s ease-out forwards,
                     spin 52s linear infinite;
          animation-delay: 0s, 1.2s;
        }

        .circle {
          position: absolute;
          width: ${circle}px;
          height: ${circle}px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
          animation:
            pointIn 0.5s ease-out forwards,
            pulse 2.5s ease-in-out infinite;
        }

        .name {
          margin-top: 8px;
          color: thistle;
          letter-spacing: 2px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          font-size: ${font}px;
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 1.2s;
        }

        @media (max-width: 992px) {
          .name { font-size: calc(${font}px * 0.8); }
        }

        @media (max-width: 576px) {
          .name { font-size: calc(${font}px * 0.6); }
        }
      
        .c1 { background-color: #FF0000; }
        .c2 { background-color: #FF7F00; }
        .c3 { background-color: #FFFF00; }
        .c4 { background-color: #55ff00; }
        .c5 { background-color: #0000FF; }
        .c6 { background-color: #bf00ff; }
 

        @keyframes zoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pointIn {
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%   { transform: translate(-50%, -50%) scale(1); }
          50%  { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .logo-circle:hover {
          animation-play-state: paused;
        }
      </style>

      <div class="logo-circle">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
        <div class="circle c4"></div>
        <div class="circle c5"></div>
        <div class="circle c6"></div>
      </div>

      <div class="name">ANTONIO <strong>ESTARLICH</strong></div>
    `;
  }

  positionCircles() {
    const circles = this.shadowRoot.querySelectorAll(".circle");
    const { base, radius } = this.getSizeConfig();
    const center = base / 2;

    circles.forEach((circle, i) => {
      const angle = (i / circles.length) * Math.PI * 2;
      circle.style.left = center + radius * Math.cos(angle) + "px";
      circle.style.top  = center + radius * Math.sin(angle) + "px";
      circle.style.animationDelay = `${0.4 + i * 0.15}s`;
    });
  }
}

customElements.define("toni-logo", ToniLogo);
