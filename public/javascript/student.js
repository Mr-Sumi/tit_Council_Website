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

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-left, .reveal-right').forEach((el) => observer.observe(el));
});

// Replace or add this JavaScript for better preloader handling
document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("preloader");
    
    // Ensure minimum loading time of 2 seconds
    setTimeout(() => {
        preloader.classList.add("fade-out");
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500); // Match this with CSS transition duration
    }, 2000);
});

// Prevent page scroll while preloader is visible
document.body.style.overflow = "hidden";
window.addEventListener("load", function() {
    document.body.style.overflow = "visible";
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-card').forEach(card => {
        observer.observe(card);
    });
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const profileImages = document.querySelectorAll('.profile-section img');
    profileImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Smooth reveal animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.option.reveal').forEach(element => {
        observer.observe(element);
    });
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe text reveal
    document.querySelectorAll('.reveal-text').forEach(element => {
        observer.observe(element);
    });

    // Observe feature reveals
    document.querySelectorAll('.reveal-item').forEach(element => {
        observer.observe(element);
    });
});