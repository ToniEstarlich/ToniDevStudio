const projects = [
  {
    title:"Nihongo Quest",
    description:"Educational game to learn Japanese with quests and quizzes.",
    video:"videos/nihongo_quest.mp4",
    live:"https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
    repo:"https://github.com/ToniEstarlich/nihongo-quest"
  },
  {
    title:"Pixel Store",
    description:"Fictional clothing store with cart and Stripe checkout.",
    video:"videos/pixel.mp4",
    live:"https://pixel-store-6fb82487a320.herokuapp.com/",
    repo:"https://github.com/ToniEstarlich/pixel-store"
  },
  {
    title:"Global News",
    description:"Responsive news website with modern design.",
    video:"videos/global_news.mp4",
    live:"https://toniestarlich.github.io/the-global-news.github.io-/",
    repo:"https://github.com/ToniEstarlich/The-Global-News"
  },
  {
    title:"Smile Clinic",
    description:"Landing page for dental clinic.",
    video:"videos/smile_clinic.mp4",
    live:"https://toniestarlich.github.io/Smile-Clinic.github.io/",
    repo:"https://github.com/ToniEstarlich/Smile_Clinic"
  },
  {
    title:"Flavon Haven Burger",
    description:"Burger restaurant website.",
    video:"videos/burguer.mp4",
    live:"https://toniestarlich.github.io/Flavon_Haven_Burguer/index.html",
    repo:"https://github.com/ToniEstarlich/Flavon_Haven_Burguer"
  },
  {
    title:"Planet Book",
    description:"Educational book repository.",
    video:"videos/planet_book.mp4",
    live:"https://github.com/ToniEstarlich/Book-Planet",
    repo:"https://github.com/ToniEstarlich/Book-Planet"
  }
];

const slider = document.getElementById("slider");
const bgVideos = document.querySelectorAll(".video_bg_container video");
const info = document.getElementById("projectInfo");

projects.forEach((proj,index)=>{
  const thumb = document.createElement("video");
  thumb.src = proj.video;
  thumb.muted = true;
  thumb.loop = true;
  thumb.autoplay = false;
  thumb.playsInline = true;

  thumb.addEventListener("click",()=>{
    bgVideos.forEach(v=>v.classList.remove("active"));
    bgVideos[index].classList.add("active");
    updateInfo(index);
  });

  slider.appendChild(thumb);
});

function updateInfo(i){
  const p = projects[i];
  info.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <a href="${p.live}" target="_blank">Live</a>
    <a href="${p.repo}" target="_blank">Repo</a>
  `;
}