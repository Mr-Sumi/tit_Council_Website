const navSilde = document.querySelector(".navSlide");
  const HomeIcon = document.querySelector("nav .nav-links i"); 
  const closeIcon = document.querySelector(".navSlide .icon i")
  HomeIcon.addEventListener("click",()=>{
    navSilde.style.right = "0%"
    // console.log("hello");
  })
  closeIcon.addEventListener("click",()=>{
    navSilde.style.right = "-100%"
  })

  let lastScrollY = window.scrollY;
  let scrollTimeout;

  const navbar = document.querySelector('nav');

  function navScroll(){
    window.addEventListener('scroll', () => {
      // console.log(window.scrollY);
      
      const currentScrollY = window.scrollY;
  
      if (currentScrollY === 0) {
        navbar.style.top = 0;
      } else if (currentScrollY > lastScrollY) {
        navbar.style.top = "-11vh"; 
      } else {
        navbar.style.top = "0"; 
      }
  
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY !== 0) {
         navbar.style.top = 0;
        }
      }, 1000);
  
      lastScrollY = currentScrollY;
    });
  
  }
  navScroll();




  // Add to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const message = entry.target.querySelector('.president-message');
                message.style.animation = 'none';
                message.offsetHeight; // Trigger reflow
                message.style.animation = null;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const presidentSection = document.querySelector('.president-details');
    if (presidentSection) {
        observer.observe(presidentSection);
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const revealItems = document.querySelectorAll(".reveal-item");

  function revealOnScroll() {
      revealItems.forEach((item) => {
          const itemPosition = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (itemPosition < windowHeight - 50) {
              item.classList.add("revealed");
          }
      });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});


document.addEventListener("DOMContentLoaded", function () {
  const revealItems = document.querySelectorAll(".reveal");

  function revealOnScroll() {
      revealItems.forEach((item) => {
          const itemPosition = item.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (itemPosition < windowHeight - 50) {
              item.classList.add("revealed");
          }
      });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, {
      threshold: 0.1
  });

  document.querySelectorAll('.reveal').forEach(element => {
      observer.observe(element);
  });
});