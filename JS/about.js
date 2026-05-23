
$(document).ready(function(){

  // Initial hidden state
  $(".about-image").css({
    opacity:0,
    transform:"translateX(-80px)"
  });

  $(".about-content").css({
    opacity:0,
    transform:"translateX(80px)"
  });

  $(".stat").css({
    opacity:0,
    transform:"translateY(40px)"
  });

  // Animate on load
  setTimeout(() => {
    $(".about-image").animate({
      opacity:1
    },800);

    $(".about-image").css({
      transform:"translateX(0)",
      transition:"1s ease"
    });

  },200);

  setTimeout(() => {
    $(".about-content").animate({
      opacity:1
    },900);

    $(".about-content").css({
      transform:"translateX(0)",
      transition:"1s ease"
    });

  },500);

  // Stats stagger animation
  $(".stat").each(function(index){

    $(this).delay(900 + (index * 200)).animate({
      opacity:1
    },600);

    $(this).css({
      transform:"translateY(0)",
      transition:"0.8s ease"
    });

  });

  // Floating image effect
  setInterval(() => {
    $(".about-image").animate({
      marginTop:"-10px"
    },1500).animate({
      marginTop:"10px"
    },1500);
  },3000);

});
