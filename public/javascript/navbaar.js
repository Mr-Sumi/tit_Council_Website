// Mobile Navigation
const navSilde = document.querySelector(".navSlide");
const HomeIcon = document.querySelector("nav .nav-links i"); 
const closeIcon = document.querySelector(".navSlide .icon i");

HomeIcon.addEventListener("click", () => {
    navSilde.style.right = "0%";
});

closeIcon.addEventListener("click", () => {
    navSilde.style.right = "-100%";
});

// Authentication Functions
function checkLoginStatus() {
    fetch('/current_user')
        .then(response => response.json())
        .then(data => {
            const loginBtn = document.getElementById('login-btn');
            const profileMenu = document.getElementById('profile-menu');

            if (data.loggedIn) {
                if (loginBtn) loginBtn.style.display = 'none';
                if (profileMenu) profileMenu.style.display = 'inline-block';
            } else {
                if (loginBtn) loginBtn.style.display = 'inline-block';
                if (profileMenu) profileMenu.style.display = 'none';
            }
        })
        .catch(error => console.error('Error checking login status:', error));
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navbar scroll behavior
let lastScrollY = window.scrollY;
let scrollTimeout;
const navbar = document.querySelector('nav');

function navScroll() {
    window.addEventListener('scroll', () => {
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




