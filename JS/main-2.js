const projects = [
  {
    title: "Nihongo Quest",
    description:
      "Full-stack educational web application designed to make learning Japanese interactive and engaging. The platform combines gamified quests, quizzes, and progress tracking to reinforce vocabulary and grammar concepts. Built with Flask and PostgreSQL, it features user authentication, dynamic content rendering, and a structured database system. This project focuses on user experience, backend logic, and scalable architecture.",
    technologies: [
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Flask", icon: "devicon-flask-original" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain" }
    ],
    video: "videos/nihongo_quest.mp4",
    live: "https://nihongo-quest-app-54ed3ed7b8f5.herokuapp.com/",
    repo: "https://github.com/ToniEstarlich/nihongo-quest"
  },

  {
    title: "Pixel Store",
    description:
       "A full-featured e-commerce web application built with Django, simulating a modern online clothing store. It includes product browsing, filtering, shopping cart functionality, and a mock checkout system powered by Stripe integration. The project demonstrates backend-driven templates, database relationships, and secure payment workflow simulation, with a strong focus on clean UI and usability.",
    technologies: ["JavaScript", "HTML", "CSS", "Python", "Django", "PostgreSQL"],
    technologies: [
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Django", icon: "devicon-django-plain" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "SQL", icon: "devicon-azuresqldatabase-plain" },
      { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" }
    ],
    video: "videos/pixel.mp4",
    live: "https://pixel-store-6fb82487a320.herokuapp.com/",
    repo: "https://github.com/ToniEstarlich/pixel-store"
  },

  {
    title: "Global News",
    description: "Responsive multi-category news platform designed with a modern layout and clean typography. The website features structured sections such as World, Technology, and Business, ensuring intuitive navigation and content hierarchy. Built with vanilla JavaScript and deployed via GitHub Pages, the project emphasizes responsive design, layout systems, and front-end best practices.",
    technologies: [
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "GitHub", icon: "devicon-github-original" }
    ],
    video: "videos/global_news.mp4",
    live: "https://toniestarlich.github.io/the-global-news.github.io-/",
    repo: "https://github.com/ToniEstarlich/The-Global-News"
  },

  {
    title: "Smile Clinic",
    description:  "Professional landing page for a dental clinic, designed to present services, contact information, and brand identity in a clean and trustworthy way. The project focuses on UI clarity, call-to-action placement, and responsive layout for all devices. Developed with HTML, CSS, and JavaScript, it highlights front-end structure and design consistency.",
    technologies: [
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "GitHub", icon: "devicon-github-original" }
    ],
    video: "videos/smile_clinic.mp4",
    live: "https://toniestarlich.github.io/Smile-Clinic.github.io/",
    repo: "https://github.com/ToniEstarlich/Smile_Clinic"
  },

  {
    title: "Flavon Haven Burger",
    description: "Modern restaurant website featuring an interactive menu, product gallery, and engaging visual presentation. The project focuses on branding, layout composition, and responsive design to simulate a real-world business website. Built using HTML, CSS, and JavaScript, it showcases front-end development skills and attention to visual detail.",
    technologies: [
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "GitHub", icon: "devicon-github-original" }
    ],
    video: "videos/burguer.mp4",
    live: "https://toniestarlich.github.io/Flavon_Haven_Burguer/index.html",
    repo: "https://github.com/ToniEstarlich/Flavon_Haven_Burguer"
  },

  {
    title: "Planet Book",
    description: "Educational project repository and book resource platform developed with React. The application is structured to organize learning materials, coding exercises, and technical documentation in a scalable way. This project demonstrates component-based architecture, reusable UI elements, and structured project organization within a modern front-end framework.",
    technologies: [
      { name: "HTML", icon: "devicon-html5-plain" },
      { name: "CSS", icon: "devicon-css3-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "React", icon: "devicon-react-original" },
      { name: "GitHub", icon: "devicon-github-original" }
    ],
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
  ${p.technologies.map(tech => `
  <div class="tech-item">
    <i class="${tech.icon} tech-icon" title="${tech.name}"></i>
  </div>
`).join("")}
</div>
    ${p.live ? `<a href="${p.live}" target="_blank">Live</a>` : ""}
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
  <!-- About Me -->
    <img src="images/me.jpg" alt="Antonio Estarlich" class="about-photo">

    <!-- Card Mac Terminal -->
    <div class="card-mac">
        <div class="terminal_toolbar">
            <div class="butt">
                <button class="btn-mac btn-color"></button>
                <button class="btn-mac"></button>
                <button class="btn-mac"></button>
            </div>
            <p class="user">antonio@dev: ~</p>
        </div>
        <div class="terminal_body">
            <div class="terminal_promt">
                <span class="terminal_user">antonio@dev:</span>
                <span class="terminal_location">~</span>
                <span class="terminal_bling">$</span>
                <span class="terminal_cursor"></span>
            </div>
            <div class="about-text">
            <p><strong>Antonio Estarlich</strong></p>
            <p>Junior Full-Stack Web Developer</p>

            <p>Developer with 4 years of training in software and web development, focused on building full-stack
                applications with Python, Flask, Django and modern JavaScript.</p>

            <p>Experienced in developing REST APIs, working with relational databases, and creating responsive front-end
                interfaces.</p>

            <p>Currently looking for my first professional role where I can contribute, continue learning, and grow as a
                software developer.</p>

        </div>
        </div>
    </div>
</div>
</div>
  

<!-- End About Me -->
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