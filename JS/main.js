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


 
//Dark/light mode

    document.addEventListener("DOMContentLoaded", function () {
        const themeToggle = document.getElementById("theme-toggle");
        const themeIcon = document.getElementById("theme-icon");
        const htmlElement = document.documentElement;

        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        htmlElement.setAttribute("data-bs-theme", savedTheme);
        themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";

        // Toggle theme on button click
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            htmlElement.setAttribute("data-bs-theme", newTheme);
            themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
            localStorage.setItem("theme", newTheme); // Save theme preference
        });
    });

