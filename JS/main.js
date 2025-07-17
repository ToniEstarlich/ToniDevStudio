document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hero-section, .card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

// Navbar animation

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hero-section, .card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

// About Espanish

document.getElementById("toggle-es").addEventListener("click", function () {
    const esContent = document.querySelector(".about-es");
    esContent.style.display = esContent.style.display === "none" ? "block" : "none";
  });

