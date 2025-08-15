let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
const itemsPerPage = 3;

function showSlides() {
  const newTranslateX = -(currentIndex * (100 / itemsPerPage));
  carousel.style.transform = `translateX(${newTranslateX}%)`;

  carouselItems.forEach((item, index) => {
    if (index >= currentIndex && index < currentIndex + itemsPerPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Handle looping (if enabled)
  if (currentIndex >= carouselItems.length / itemsPerPage) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = Math.floor(carouselItems.length / itemsPerPage) - 1;
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % Math.ceil(carouselItems.length / itemsPerPage);
  showSlides();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + Math.ceil(carouselItems.length / itemsPerPage)) % Math.ceil(carouselItems.length / itemsPerPage);
  showSlides();
}

// Initialize carousel
showSlides();