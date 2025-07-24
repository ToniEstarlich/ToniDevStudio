const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const realSlides = totalSlides - 1;
    let currentIndex = 0;

    const animations = ['fadeInUp', 'zoomIn', 'fadeInLeft', 'fadeInRight'];

    function animateText(index) {
      const text = slides[index]?.querySelector('.slide-text');
      if (text) {
        text.style.opacity = 0;
        text.style.animation = '';
        const anim = animations[Math.floor(Math.random() * animations.length)];
        setTimeout(() => {
          text.style.animation = `${anim} 1.5s ease forwards`;
        }, 100);
      }
    }

    function showSlide(index, animate = true) {
      const offset = -index * 100;
      track.style.transition = animate ? 'transform 1s ease-in-out' : 'none';
      track.style.transform = `translateX(${offset}%)`;
      if (animate) animateText(index);
    }

    function nextSlide() {
      currentIndex++;
      showSlide(currentIndex);

      if (currentIndex === realSlides) {
        setTimeout(() => {
          currentIndex = 0;
          showSlide(currentIndex, false);
        }, 1000);
      }
    }

    // Initialize
    showSlide(currentIndex);
    animateText(currentIndex);

    // Auto-slide
    setInterval(nextSlide, 8000);