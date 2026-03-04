const projects = [
  {
    title: "Nihongo Quest",
    description: "Full-stack educational web application designed to make learning Japanese interactive and engaging. The platform combines gamified quests, quizzes, and progress tracking to reinforce vocabulary and grammar concepts. Built with Flask and PostgreSQL, it features user authentication, dynamic content rendering, and a structured database system. This project focuses on user experience, backend logic, and scalable architecture.",
    technologies: ["JavaScript", "HTML", "CSS", "Python", "Flask", "PostgreSQL"],
    video: "videos/nihongo_quest.mp4",
    live: "https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
    repo: "https://github.com/ToniEstarlich/nihongo-quest"
  },
  {
    title: "Pixel Store",
    description: "A full-featured e-commerce web application built with Django, simulating a modern online clothing store. It includes product browsing, filtering, shopping cart functionality, and a mock checkout system powered by Stripe integration. The project demonstrates backend-driven templates, database relationships, and secure payment workflow simulation, with a strong focus on clean UI and usability.",
    technologies: ["JavaScript", "HTML", "CSS", "Python", "Django", "PostgreSQL"],
    video: "videos/pixel.mp4",
    live: "https://pixel-store-6fb82487a320.herokuapp.com/",
    repo: "https://github.com/ToniEstarlich/pixel-store"
  },
  {
    title: "Global News",
    description: "Responsive multi-category news platform designed with a modern layout and clean typography. The website features structured sections such as World, Technology, and Business, ensuring intuitive navigation and content hierarchy. Built with vanilla JavaScript and deployed via GitHub Pages, the project emphasizes responsive design, layout systems, and front-end best practices.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/global_news.mp4",
    live: "https://toniestarlich.github.io/the-global-news.github.io-/",
    repo: "https://github.com/ToniEstarlich/The-Global-News"
  },
  {
    title: "Smile Clinic",
    description: "Professional landing page for a dental clinic, designed to present services, contact information, and brand identity in a clean and trustworthy way. The project focuses on UI clarity, call-to-action placement, and responsive layout for all devices. Developed with HTML, CSS, and JavaScript, it highlights front-end structure and design consistency.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/smile_clinic.mp4",
    live: "https://toniestarlich.github.io/Smile-Clinic.github.io/",
    repo: "https://github.com/ToniEstarlich/Smile_Clinic"
  },
  {
    title: "Flavon Haven Burger",
    description: "Modern restaurant website featuring an interactive menu, product gallery, and engaging visual presentation. The project focuses on branding, layout composition, and responsive design to simulate a real-world business website. Built using HTML, CSS, and JavaScript, it showcases front-end development skills and attention to visual detail.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    video: "videos/burguer.mp4",
    live: "https://toniestarlich.github.io/Flavon_Haven_Burguer/index.html",
    repo: "https://github.com/ToniEstarlich/Flavon_Haven_Burguer"
  },
  {
    title: "Planet Book",
    description: "Educational project repository and book resource platform developed with React. The application is structured to organize learning materials, coding exercises, and technical documentation in a scalable way. This project demonstrates component-based architecture, reusable UI elements, and structured project organization within a modern front-end framework.",
    technologies: ["HTML", "CSS", "JavaScript","React", "GitHub"],
    video: "videos/planet_book.mp4",
    repo: "https://github.com/ToniEstarlich/Book-Planet"
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
    <h3 class="project-title">${p.title}</h3>
    <p>${p.description}</p>
    <div class="tech-container">
  ${p.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join("")}
</div>
    <a href="${p.live}" target="_blank">Live</a>
    <a href="${p.repo}" target="_blank">Repo</a>
  `;

  // animaition tittle
const title = document.querySelector(".project-title");
  
  title.classList.remove("glitch", "active");
  void title.offsetWidth; // force reflow
  
  title.classList.add("glitch", "active");

  setTimeout(() => {
    title.classList.remove("glitch");
  }, 400);
}

// About me

const aboutContent = `
  <div class="about-slider-wrapper">
    <div class="about-slider"></div> <!-- Aquí irán las imágenes de fondo -->

    <div class="about-content">
      <img src="images/me.jpg" alt="Antonio Estarlich" class="about-photo">

      <div class="about-text">
        <h3>Antonio Estarlich</h3>
        <p class="about-role">Software & Web Developer</p>

        <p>
          I design and build complete web applications with a strong focus on
          backend architecture, database systems, and scalable logic.
        </p>

        <p>
          My experience includes APIs, relational databases, and modern front-end
          interfaces.
        </p>

        <p>
          Currently expanding into AI-driven applications and interactive 3D experiences.
        </p>
      </div>
    </div>
  </div>
`;

document.getElementById("aboutBtn").addEventListener("click", function(e) {
  e.preventDefault();

  // get out video 
  bgVideos.forEach(v => v.classList.remove("active"));

  // show about
  info.innerHTML = aboutContent;
});

// slide About

const sliderImages = [
  "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
];

let currentSlide = 0;

function startAboutSlider() {
  const slider = document.querySelector(".about-slider");
  if (!slider) return;

  slider.style.backgroundImage = `url(${sliderImages[currentSlide]})`;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    slider.style.backgroundImage = `url(${sliderImages[currentSlide]})`;
  }, 5000); // cambia cada 5 segundos
}

// llama a la función cuando cargas About
startAboutSlider();