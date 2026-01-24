// How to use the component:
// <bw-logo-bw size="navbar"></bw-logo-bw>
// <bw-logo-bw size="medium"></bw-logo-bw>
// <bw-logo-bw size="large"></bw-logo-bw>
// <bw-logo-bw></bw-logo-bw> <!-- default medium -->

// SIZE CONFIG (outside the class)
const SIZES = {
  navbar: { base: 60, circle: 12, radius: 22, font: 0 },
  small:  { base: 120, circle: 24, radius: 42, font: 18 },
  medium: { base: 200, circle: 50, radius: 60, font: 34 },
  large:  { base: 300, circle: 70, radius: 90, font: 48 }
};

class ToniLogoBWv2 extends HTMLElement {
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
          margin: 1px;
        }

        .logo-circle {
          position: relative;
          width: ${base}px;
          height: ${base}px;
          animation: spin 52s linear infinite;
        }

        .circle {
          position: absolute;
          width: ${circle}px;
          height: ${circle}px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          /* light glow so circles are visible on any background */
          box-shadow: 0 0 6px rgba(255,255,255,0.6);
          animation: pulse 2.5s ease-in-out infinite;
        }

        .name {
          margin-top: 8px;
          color: #EEE;
          letter-spacing: 2px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          font-size: ${font}px;
        }

        /* High contrast grayscale palette */
        .c1 { background-color: #FFFFFF; }
        .c2 { background-color: #CCCCCC; }
        .c3 { background-color: #999999; }
        .c4 { background-color: #666666; }
        .c5 { background-color: #333333; }
        .c6 { background-color: #000000; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%   { transform: translate(-50%, -50%) scale(1); }
          50%  { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
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
      circle.style.animationDelay = `${i * 0.25}s`;
    });
  }
}

// Define the custom element with a new name
customElements.define("bw-logo-bw", ToniLogoBWv2);
