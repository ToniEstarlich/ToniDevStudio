/* logo-lab.component.js
   Include with: <script src="logo-lab.component.js"></script>
   Call automatically after DOM loaded
*/

(function(global) {
  function createLogoLab(options = {}) {
    const defaults = {
      containerId: 'logo-container', // container div
      text: ['D','E','V','L','A','B'], // letters
      fontSize: '15px', // adjust for navbar
      color: '#000',
      waveDuration: 600, // ms between letters animation
      url: 'https://toniestarlich.github.io/dev-live/dev_lab/templates/intro.html', // link on click
      target: '_blank' // open in new tab
    };
    const opts = { ...defaults, ...options };

    function init() {
      const container = document.getElementById(opts.containerId);
      if (!container) return;

      container.innerHTML = ''; // clear previous content

      // Create link element
      const link = document.createElement('a');
      link.href = opts.url;
      link.target = opts.target;
      link.style.textDecoration = 'none';
      link.style.cursor = 'pointer';
      container.appendChild(link);

      // Create h1 inside the link
      const h1 = document.createElement('h1');
      h1.style.display = 'inline-block';
      h1.style.margin = 0;
      h1.style.lineHeight = '0.5';
      link.appendChild(h1);

      opts.text.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.fontSize = opts.fontSize;
        span.style.color = opts.color;
        span.style.transition = 'transform 0.9s ease';
        h1.appendChild(span);

        if (i === 2) h1.appendChild(document.createElement('br')); // split DEV / LAB
      });

      const spans = h1.querySelectorAll('span');

      // Wave animation loop
      let step = 0;
      setInterval(() => {
        spans.forEach((span, idx) => {
          const offset = (step + idx) % spans.length;
          span.style.transform = `translateY(${offset % 4 === 0 ? -5 : 5}px)`;
        });
        step++;
      }, opts.waveDuration);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  global.createLogoLab = createLogoLab;

  // Auto-create inside container if it exists
  createLogoLab();
})(window);
