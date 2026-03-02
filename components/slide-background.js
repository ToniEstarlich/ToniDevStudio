const projects = [
{
title:"Nihongo Quest",
description:"Educational game to learn Japanese with quests and quizzes.",
technologies:["JavaScript","HTML","CSS","Python","Flask","PostgreSQL"],
video:"videos/nihongo_quest.mp4",
live:"https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
repo:"https://github.com/ToniEstarlich/nihongo-quest"
},
{
title:"Pixel Store",
description:"Online store for digital products with shopping cart and simulated payments.",
technologies:["JavaScript","HTML","CSS","Python","Django","PostgreSQL"],
video:"videos/pixel.mp4",
live:"https://pixel-store-6fb82487a320.herokuapp.com/",
repo:"https://github.com/ToniEstarlich/pixel-store"
},
{
title:"Global News",
description:"Responsive news website with multiple categories and modern design.",
technologies:["HTML","CSS","JavaScript","GitHub Pages"],
video:"videos/global_news.mp4",
live:"https://toniestarlich.github.io/the-global-news.github.io-/",
repo:"https://github.com/ToniEstarlich/The-Global-News"
},
{
title:"Smile Clinic",
description:"Landing page for a dental clinic showcasing services and contact info.",
technologies:["HTML","CSS","JavaScript","GitHub Pages"],
video:"videos/smile_clinic.mp4",
live:"https://toniestarlich.github.io/Smile-Clinic.github.io/",
repo:"https://github.com/ToniEstarlich/Smile_Clinic"
},
{
title:"Flavon Haven Burger",
description:"Burger restaurant website with menu and product gallery.",
technologies:["HTML","CSS","JavaScript","GitHub Pages"],
video:"videos/burguer.mp4",
live:"https://toniestarlich.github.io/Flavon_Haven_Burguer/index.html",
repo:"https://github.com/ToniEstarlich/Flavon_Haven_Burguer"
},
{
title:"Planet Book",
description:"Repository of book projects and educational resources.",
technologies:["HTML","CSS","JavaScript","React","GitHub"],
video:"videos/planet_book.mp4",
repo:"https://github.com/ToniEstarlich/Book-Planet"
}
];

class PortfolioCarousel {
  constructor(selector, projects){
    this.container = document.querySelector(selector);
    this.projects = projects;
    this.index = 0;
    this.render();
    this.startAuto();
  }

  render(){
    this.container.classList.add("pc-wrapper");

    this.container.innerHTML = `
      <div class="pc-slides">
        ${this.projects.map((p,i)=>`
          <div class="pc-slide ${i===0?"active":""}">
            <video src="${p.video}" autoplay muted loop playsinline></video>

            <div class="pc-overlay"></div>

            <div class="pc-content">
              <h2>${p.title}</h2>
              <p>${p.description}</p>
              <div class="pc-tech">
                ${p.technologies.map(t=>`<span>${t}</span>`).join("")}
              </div>

              <div class="pc-buttons">
                ${p.live?`<a href="${p.live}" target="_blank">Live</a>`:""}
                ${p.repo?`<a href="${p.repo}" target="_blank">Repo</a>`:""}
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="pc-nav">
        ${this.projects.map((_,i)=>`
          <button data-index="${i}"></button>
        `).join("")}
      </div>
    `;

    this.slides = this.container.querySelectorAll(".pc-slide");
    this.dots = this.container.querySelectorAll(".pc-nav button");

    this.dots.forEach(btn=>{
      btn.addEventListener("click",e=>{
        this.goTo(parseInt(btn.dataset.index));
      });
    });
  }

  goTo(i){
    this.slides[this.index].classList.remove("active");
    this.dots[this.index].classList.remove("active");

    this.index = i;

    this.slides[this.index].classList.add("active");
    this.dots[this.index].classList.add("active");
  }

  next(){
    let i = this.index+1;
    if(i>=this.projects.length) i=0;
    this.goTo(i);
  }

  startAuto(){
    this.timer = setInterval(()=>this.next(),6000);
  }
}


/* ========= INIT ========= */
window.addEventListener("DOMContentLoaded",()=>{
  new PortfolioCarousel("#portfolio-carousel", projects);
});