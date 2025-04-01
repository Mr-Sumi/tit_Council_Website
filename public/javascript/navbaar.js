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

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.ri-menu-line');
    const closeButton = document.querySelector('.ri-close-large-line');
    const navSlide = document.querySelector('.navSlide');
    
    // Open menu
    menuButton.addEventListener('click', () => {
        navSlide.style.right = '0';
    });
    
    // Close menu
    closeButton.addEventListener('click', () => {
        navSlide.style.right = '-100%';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navSlide.contains(e.target) && !menuButton.contains(e.target)) {
            navSlide.style.right = '-100%';
        }
    });
});




