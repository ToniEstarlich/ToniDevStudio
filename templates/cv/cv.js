$(document).ready(function () {

```
/*
============================================
CV 2026 - Antonio Estarlich
jQuery interactions & animations
============================================
*/


// ------------------------------------------
// Navbar scroll effect
// ------------------------------------------

$(window).on("scroll", function () {

    const scrollPosition = $(window).scrollTop();

    if (scrollPosition > 50) {
        $(".navbar").addClass("scrolled");
    } else {
        $(".navbar").removeClass("scrolled");
    }

});


// ------------------------------------------
// Smooth navigation
// ------------------------------------------

$('a[href^="#"]').on("click", function (event) {

    const target = $(this).attr("href");

    if (target === "#" || !$(target).length) {
        return;
    }

    event.preventDefault();

    $("html, body").animate(
        {
            scrollTop: $(target).offset().top - 80
        },
        700,
        "swing"
    );

});


// ------------------------------------------
// Hero entrance animation
// ------------------------------------------

$(".hero-content").css({
    opacity: 0,
    transform: "translateY(25px)"
});

$(".hero-content").animate(
    {
        opacity: 1
    },
    900
);

$(".hero-content").css(
    "transform",
    "translateY(0)"
);


// ------------------------------------------
// Terminal animation
// ------------------------------------------

$(".hero-card").css({
    opacity: 0,
    transform: "translateX(35px)"
});

setTimeout(function () {

    $(".hero-card").animate(
        {
            opacity: 1
        },
        900
    );

    $(".hero-card").css(
        "transform",
        "translateX(0)"
    );

}, 250);


// ------------------------------------------
// Scroll reveal
// ------------------------------------------

$(".section").each(function () {
    $(this).addClass("reveal");
});


function revealSections() {

    $(".reveal").each(function () {

        const elementTop = $(this).offset().top;

        const windowBottom =
            $(window).scrollTop() +
            $(window).height();

        if (windowBottom > elementTop + 80) {

            $(this).addClass("revealed");

        }

    });

}


$(window).on("scroll", revealSections);

revealSections();


// ------------------------------------------
// Project cards stagger animation
// ------------------------------------------

$(".project-card").each(function (index) {

    $(this).css({
        opacity: 0,
        transform: "translateY(25px)"
    });

    const card = $(this);

    setTimeout(function () {

        card.animate(
            {
                opacity: 1
            },
            500
        );

        card.css(
            "transform",
            "translateY(0)"
        );

    }, 300 + (index * 130));

});


// ------------------------------------------
// Skill tags hover animation
// ------------------------------------------

$(".skill-tags span").on("mouseenter", function () {

    $(this).stop(true).animate(
        {
            opacity: 0.75
        },
        120
    );

}).on("mouseleave", function () {

    $(this).stop(true).animate(
        {
            opacity: 1
        },
        120
    );

});


// ------------------------------------------
// Project card mouse interaction
// ------------------------------------------

$(".project-card").on("mouseenter", function () {

    $(this)
        .find(".project-icon")
        .stop(true)
        .animate(
            {
                marginLeft: "5px"
            },
            200
        );

}).on("mouseleave", function () {

    $(this)
        .find(".project-icon")
        .stop(true)
        .animate(
            {
                marginLeft: "0"
            },
            200
        );

});


// ------------------------------------------
// Timeline animation
// ------------------------------------------

$(".timeline-item").each(function (index) {

    $(this).css({
        opacity: 0,
        transform: "translateX(-25px)"
    });

    const item = $(this);

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    item.animate(
                        {
                            opacity: 1
                        },
                        650
                    );

                    item.css(
                        "transform",
                        "translateX(0)"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    observer.observe(this);

});


// ------------------------------------------
// Education card animation
// ------------------------------------------

$(".education-card").each(function (index) {

    const card = $(this);

    card.css({
        opacity: 0,
        transform: "translateY(20px)"
    });

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    setTimeout(function () {

                        card.animate(
                            {
                                opacity: 1
                            },
                            500
                        );

                        card.css(
                            "transform",
                            "translateY(0)"
                        );

                    }, index * 130);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    observer.observe(this);

});


// ------------------------------------------
// Print CV
// ------------------------------------------

$("#printCV").on("click", function () {

    window.print();

});


// ------------------------------------------
// Dynamic current year
// ------------------------------------------

const currentYear = new Date().getFullYear();

$("footer p").text(
    "© " + currentYear + " Antonio Estarlich"
);


// ------------------------------------------
// Subtle terminal typing effect
// ------------------------------------------

const terminalSuccess = $(".terminal-success");

terminalSuccess.css({
    opacity: 0
});

setTimeout(function () {

    terminalSuccess.animate(
        {
            opacity: 1
        },
        700
    );

}, 1800);


// ------------------------------------------
// Keyboard shortcut
// Ctrl/Cmd + P -> Print CV
// ------------------------------------------

$(document).on("keydown", function (event) {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "p"
    ) {

        // Let the browser handle normal printing.

        return;

    }

});


// ------------------------------------------
// Console branding
// ------------------------------------------

console.log(
    "%cAntonio Estarlich",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cFull-Stack Developer | Web & Automation Systems",
    "font-size: 12px;"
);

console.log(
    "Portfolio: https://toniestarlich.github.io/ToniDevStudio/"
);
```

});
