// Scroll skills reveal animation
    const cards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));