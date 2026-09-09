$(document).ready(function () {

    /*
    =========================================
    Antonio Estarlich
    CV — 2026
    Minimal jQuery interactions
    =========================================
    */


    // ---------------------------------------
    // Header changes slightly on scroll
    // ---------------------------------------

    $(window).on("scroll", function () {

        if ($(window).scrollTop() > 30) {

            $(".site-header").css({
                "box-shadow": "0 1px 15px rgba(0,0,0,0.04)"
            });

        } else {

            $(".site-header").css({
                "box-shadow": "none"
            });

        }

    });


    // ---------------------------------------
    // Smooth scrolling
    // ---------------------------------------

    $('a[href^="#"]').on("click", function (event) {

        const target = $(this).attr("href");

        if (target === "#" || !$(target).length) {
            return;
        }

        event.preventDefault();

        $("html, body").animate(
            {
                scrollTop: $(target).offset().top - 70
            },
            650,
            "swing"
        );

    });


    // ---------------------------------------
    // Hero entrance
    // ---------------------------------------

    $(".hero h1").css({
        opacity: 0,
        transform: "translateY(25px)"
    });

    $(".hero h1").animate(
        {
            opacity: 1
        },
        900
    );

    $(".hero h1").css({
        transform: "translateY(0)"
    });


    $(".hero-intro, .hero-contact").css({
        opacity: 0
    });

    setTimeout(function () {

        $(".hero-intro").animate(
            {
                opacity: 1
            },
            700
        );

        $(".hero-contact").animate(
            {
                opacity: 1
            },
            700
        );

    }, 350);


    // ---------------------------------------
    // Add reveal class
    // ---------------------------------------

    $(".section-content").addClass("js-reveal");


    // ---------------------------------------
    // Intersection Observer
    // ---------------------------------------

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    $(entry.target).addClass("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    $(".js-reveal").each(function () {

        revealObserver.observe(this);

    });


    // ---------------------------------------
    // Project cards stagger
    // ---------------------------------------

    $(".project").each(function (index) {

        $(this).css({
            opacity: 0,
            transform: "translateY(20px)"
        });

        const card = this;

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        setTimeout(function () {

                            $(card).animate(
                                {
                                    opacity: 1
                                },
                                600
                            );

                            $(card).css({
                                transform: "translateY(0)"
                            });

                        }, index * 120);

                        observer.unobserve(card);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        observer.observe(this);

    });


    // ---------------------------------------
    // Project hover
    // ---------------------------------------

    $(".project").on("mouseenter", function () {

        $(this)
            .find(".project-number")
            .stop(true)
            .animate(
                {
                    opacity: 0.45
                },
                200
            );

    }).on("mouseleave", function () {

        $(this)
            .find(".project-number")
            .stop(true)
            .animate(
                {
                    opacity: 1
                },
                200
            );

    });


    // ---------------------------------------
    // Skill rows hover
    // ---------------------------------------

    $(".skill-row").on("mouseenter", function () {

        $(this)
            .find(".skill-name")
            .stop(true)
            .animate(
                {
                    marginLeft: "6px"
                },
                180
            );

    }).on("mouseleave", function () {

        $(this)
            .find(".skill-name")
            .stop(true)
            .animate(
                {
                    marginLeft: "0"
                },
                180
            );

    });


    // ---------------------------------------
    // Education hover
    // ---------------------------------------

    $(".education-item").on("mouseenter", function () {

        $(this).css({
            background: "rgba(255,214,10,0.08)"
        });

    }).on("mouseleave", function () {

        $(this).css({
            background: "transparent"
        });

    });


    // ---------------------------------------
    // Print / Save PDF
    // ---------------------------------------

    $("#printCV").on("click", function () {

        window.print();

    });


    // ---------------------------------------
    // Email interaction
    // ---------------------------------------

    $(".closing-inner > a").on("mouseenter", function () {

        $(this)
            .find("span")
            .stop(true)
            .animate(
                {
                    marginLeft: "6px"
                },
                180
            );

    }).on("mouseleave", function () {

        $(this)
            .find("span")
            .stop(true)
            .animate(
                {
                    marginLeft: "0"
                },
                180
            );

    });


    // ---------------------------------------
    // Console message
    // ---------------------------------------

    console.log(
        "Antonio Estarlich — Full-Stack Developer"
    );

    console.log(
        "Portfolio: https://toniestarlich.github.io/ToniDevStudio/"
    );

});
