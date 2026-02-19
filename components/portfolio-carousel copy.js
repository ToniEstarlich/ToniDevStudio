(function () {

  class PortfolioCarousel {
    constructor(selector, projects) {
      this.container = document.querySelector(selector);
      this.projects = projects;
      this.current = 0;
                             // Initialization steps with his language elements
      this.injectCSS();      // 🟪 css
      this.renderHTML();     // 🟧 html
      this.cacheElements();  // 🟨 js
      this.bindEvents();     // 🟨 js
      this.playCurrent();    // 🟨 js
    }

    injectCSS() {
      const style = document.createElement("style");
      style.innerHTML = `
       .pc-wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 3rem auto;
}

.pc-main {
  position: relative;
  height: 500px;
}

.pc-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.5s ease;
}

.pc-slide.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 2;
}

.pc-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  pointer-events: none;
  position: relative;   
  z-index: 1; 
}

/* ICONS */
.pc-icons {
  position: absolute;
  
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.pc-icons a {
  width: 42px;
  height: 42px;
  background: rgba(0,0,0,0.6);
  color: white;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 1.1rem;
  transition: transform 0.2s ease, background 0.2s ease;
  pointer-events: auto;
}

.pc-icons a:hover {
  transform: scale(1.1);
  background: rgba(0,0,0,0.85);
}

.pc-icons i {
  font-size: 1.9rem;
  line-height: 1;
}

/* THUMBS */
.pc-thumbs {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  scrollbar-color: rgba(0,0,0,0.2) transparent;
  scrollbar-width: thin;
  transition: all 0.3s ease;
}

/* Chrome, Edge, Safari */
.pc-thumbs::-webkit-scrollbar {
  height: 8px;  /* tamaño del scrollbar horizontal */
}

.pc-thumbs::-webkit-scrollbar-track {
  background: transparent;
}

.pc-thumbs::-webkit-scrollbar-thumb {
  background-color: rgba(255, 240, 31, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.pc-thumbs:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 240, 31, 0.5);
  transform: scale(8.2);
}

/* THUMBS */
.pc-thumb {
  width: 160px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  filter: blur(1px) brightness(0.6);
  border-radius: 8px;
  transition: transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;

  /* efecto 3D */
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transform-style: preserve-3d;
}

.pc-thumb.active {
  filter: blur(0) brightness(1);
  transform: scale(1.05) translateZ(0);
  box-shadow: 0 8px 12px rgba(0,0,0,0.3);
}

.pc-thumb:hover {
  transform: scale(1.15) translateZ(10px) rotateX(2deg) rotateY(2deg);
  filter: blur(0) brightness(1);
  box-shadow: 0 12px 20px rgba(0,0,0,0.35);
}


/* TABLET */
@media (max-width: 992px) {
  .pc-main {
    height: 400px;
  }
  .pc-thumb {
    width: 140px;
    height: 90px;
  }
}

/* MOBILE */
@media (max-width: 600px) {
  .pc-main {
    height: 360px;
  }
  .pc-thumb {
    width: 60px;
    height: 70px;
  }
  .pc-icons a {
    width: 64px;
    height: 64px;
  }
  .pc-icons i {
    font-size: 3rem;
  }
}

/* DESCRIPTION */

.pc-description {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  max-width: 90%;
  font-family: sans-serif;
  z-index: 20;
}

.pc-description h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.pc-description p {
  margin: 0;
  font-size: 0.85rem;
}

.pc-description .tech {
  font-style: italic;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .pc-description h3 {
    font-size: 0.9rem;
  }
  .pc-description p {
    font-size: 0.75rem;
  }
}


      `;
      document.head.appendChild(style);
    }

    renderHTML() {
      this.container.innerHTML = `

        <div class="pc-wrapper">
          <div class="pc-main">
            ${this.projects.map(
              (p, i) => `
                <div class="pc-slide ${i === 0 ? "active" : ""}">
                  <video class="pc-video" muted loop playsinline>
                    <source src="${p.video}" type="video/mp4">
                  </video>

                  <div class="pc-icons">
                    ${p.repo ? `
                      <a href="${p.repo}" target="_blank" aria-label="GitHub">
                        <i class="bi bi-github"></i>
                      </a>` : ""
                    }

                    ${p.live ? `
                      <a href="${p.live}" target="_blank" aria-label="Live">
                        <i class="bi bi-box-arrow-up-right"></i>
                      </a>` : ""
                    }
                  </div>

                  <div class="pc-description">
                      <h3>${p.title}</h3>
                      <p>${p.description}</p>
                      ${p.technologies ? `<p class="tech">Tech: ${p.technologies.join(", ")}</p>` : ""}
                   </div>

                </div>
              `
            ).join("")}
          </div>

          <div class="pc-thumbs">
            ${this.projects.map(
              (p, i) => `
                <video 
                  class="pc-thumb ${i === 0 ? "active" : ""}" 
                  muted 
                  loop 
                  playsinline 
                  data-index="${i}">
                  <source src="${p.video}" type="video/mp4">
                </video>
              `
            ).join("")}
          </div>
        </div>
      `;
    }

    cacheElements() {
      this.slides = this.container.querySelectorAll(".pc-slide");
      this.videos = this.container.querySelectorAll(".pc-video");
      this.thumbs = this.container.querySelectorAll(".pc-thumb");
    }

    bindEvents() {
      this.thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
          this.goTo(+thumb.dataset.index);
        });
      });
    }

    goTo(index) {
      if (index === this.current) return;

      this.slides[this.current].classList.remove("active");
      this.thumbs[this.current].classList.remove("active");
      this.videos[this.current].pause();

      this.current = index;

      this.slides[this.current].classList.add("active");
      this.thumbs[this.current].classList.add("active");

      this.playCurrent();
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
    technologies: ["JavaScript", "HTML", "CSS", "Python", "Flask", "PostgreSQL"],
    video: "videos/nihongo_quest.mp4",
    live: "https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
    repo: "https://github.com/ToniEstarlich/nihongo-quest"
  },
  {
    title: "Pixel Store",
    description: "Online store for digital products with shopping cart and simulated payments.",
    technologies: ["JavaScript", "HTML", "CSS", "Python", "Django", "PostgreSQL"],
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

  new PortfolioCarousel("#portfolio-carousel", projects);

})();
