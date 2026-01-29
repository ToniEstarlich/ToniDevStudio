(function () {

  class FullscreenNetflixPortfolio {
    constructor(selector, projects) {
      this.container = document.querySelector(selector);
      this.projects = projects;
      this.current = 0;

      this.injectCSS();
      this.renderHTML();
      this.cacheElements();
      this.bindEvents();
      this.playCurrent();
    }

    injectCSS() {
      const style = document.createElement("style");
      style.innerHTML = `

        /* FULLSCREEN LAYOUT */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          background: black;
        }

        .nf-container {
          width: 100vw;
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .nf-main {
          flex: 1;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .nf-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.6s ease, transform 0.8s ease;
          transform: scale(0.97);
        }

        .nf-slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .nf-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* INFO OVERLAY */
        .nf-info {
          position: absolute;
          bottom: 5%;
          left: 5%;
          color: white;
          background: rgba(0,0,0,0.6);
          padding: 1rem 1.5rem;
          border-radius: 10px;
          max-width: 60%;
          font-family: sans-serif;
        }
        .nf-info h2 {
          margin: 0 0 0.3rem 0;
          font-size: 2rem;
        }
        .nf-info p {
          margin: 0.2rem 0;
        }
        .nf-info .tech {
          font-size: 0.9rem;
          opacity: 0.85;
        }

        /* THUMBNAILS ROW */
        .nf-thumbs {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 1rem 2rem;
          background: rgba(0,0,0,0.9);
          width: 100%;
          box-sizing: border-box;
          scroll-snap-type: x mandatory;
        }
        .nf-thumbs::-webkit-scrollbar {
          height: 8px;
        }
        .nf-thumbs::-webkit-scrollbar-thumb {
          background: rgba(200,200,0,0.4);
          border-radius: 4px;
        }

        .nf-thumb {
          width: 200px;
          height: 115px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          flex-shrink: 0;
          filter: brightness(0.5);
          scroll-snap-align: center;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .nf-thumb:hover,
        .nf-thumb.active {
          transform: scale(1.25);
          filter: brightness(1);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .nf-info h2 { font-size: 1.6rem; }
          .nf-thumb { width: 140px; height: 80px; }
        }
      `;
      document.head.appendChild(style);
    }

    renderHTML() {
      this.container.innerHTML = `
        <div class="nf-container">
          <div class="nf-main">
            ${this.projects.map((p, i) => `
              <div class="nf-slide ${i===0 ? 'active' : ''}">
                <video class="nf-video" muted loop playsinline>
                  <source src="${p.video}" type="video/mp4">
                </video>
                <div class="nf-info">
                  <h2>${p.title}</h2>
                  <p>${p.description}</p>
                  ${p.technologies ? `<p class="tech">Tech: ${p.technologies.join(', ')}</p>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="nf-thumbs">
            ${this.projects.map((p,i) => `
              <video class="nf-thumb ${i===0 ? 'active' : ''}" muted loop playsinline data-index="${i}">
                <source src="${p.video}" type="video/mp4">
              </video>
            `).join('')}
          </div>
        </div>
      `;
    }

    cacheElements() {
      this.slides = this.container.querySelectorAll('.nf-slide');
      this.videos = this.container.querySelectorAll('.nf-video');
      this.thumbs = this.container.querySelectorAll('.nf-thumb');
    }

    bindEvents() {
      this.thumbs.forEach(thumb => {
        thumb.addEventListener('mouseenter', () => thumb.play());
        thumb.addEventListener('mouseleave', () => {
          thumb.pause();
          thumb.currentTime = 0;
        });
        thumb.addEventListener('click', () => this.goTo(+thumb.dataset.index));
      });
    }

    goTo(index) {
      if (index === this.current) return;

      this.slides[this.current].classList.remove('active');
      this.thumbs[this.current].classList.remove('active');
      this.videos[this.current].pause();

      this.current = index;

      this.slides[this.current].classList.add('active');
      this.thumbs[this.current].classList.add('active');

      this.videos[this.current].play();
      this.thumbs[this.current].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

    playCurrent() {
      this.videos.forEach(v => v.pause());
      this.videos[this.current].play();
    }
  }

  const projects = [
    {
      title: "Nihongo Quest",
      description: "Educational game to learn Japanese with quests and quizzes.",
      technologies: ["JavaScript","HTML","CSS","Python","Flask","PostgreSQL"],
      video: "videos/nihongo_quest.mp4",
      live: "https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
      repo: "https://github.com/ToniEstarlich/nihongo-quest"
    },
    {
      title: "Pixel Store",
      description: "Online store for digital products with shopping cart and simulated payments.",
      technologies: ["JavaScript","HTML","CSS","Python","Django","PostgreSQL"],
      video: "videos/pixel.mp4",
      live: "https://pixel-store-6fb82487a320.herokuapp.com/",
      repo: "https://github.com/ToniEstarlich/pixel-store"
    },
     {
    title: "Global News",
    description: "Responsive news website with multiple categories and modern design.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/global_news.mp4",
    live: "https://toniestarlich.github.io/the-global-news.github.io-/",
    repo: "https://github.com/ToniEstarlich/The-Global-News"
  },
  {
    title: "Smile Clinic",
    description: "Landing page for a dental clinic showcasing services and contact info.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/smile_clinic.mp4",
    live: "https://toniestarlich.github.io/Smile-Clinic.github.io/",
    repo: "https://github.com/ToniEstarlich/Smile_Clinic"
  },
  {
    title: "Flavon Haven Burger",
    description: "Burger restaurant website with menu and product gallery.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/burguer.mp4",
    live: "https://toniestarlich.github.io/Flavon_Haven_Burguer/index.html",
    repo: "https://github.com/ToniEstarlich/Flavon_Haven_Burguer"
  },
  {
    title: "Planet Book",
    description: "Repository of book projects and educational resources.",
    technologies: ["HTML", "CSS", "JavaScript","React", "GitHub"],
    video: "videos/planet_book.mp4",
    repo: "https://github.com/ToniEstarlich/Book-Planet"
  }
  ];

  new FullscreenNetflixPortfolio("#portfolio-carousel-full", projects);

})();
