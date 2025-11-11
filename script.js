// Future interactivity goes here
console.log('CoolCar website loaded.');

const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.classList.toggle('active');
});
// ...existing code...

// Image Carousel Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide
  if (slides[index]) {
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Auto-play carousel (optional)
function autoPlay() {
  changeSlide(1);
}

// Start auto-play every 5 seconds
setInterval(autoPlay, 5000);

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
  if (slides.length > 0) {
    showSlide(0);
  }
});
// Import Page Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const importSlides = document.querySelectorAll('.import-carousel-slide');
  const importDots = document.querySelectorAll('.import-dot');
  const prevBtn = document.querySelector('.import-prev');
  const nextBtn = document.querySelector('.import-next');
  
  if (importSlides.length > 0) {
    let currentImportSlide = 0;
    let importAutoPlay;

    function showImportSlide(index) {
      // Remove active class from all slides and dots
      importSlides.forEach(slide => slide.classList.remove('active'));
      importDots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      importSlides[index].classList.add('active');
      if (importDots[index]) {
        importDots[index].classList.add('active');
      }
    }

    function changeImportSlide(direction) {
      currentImportSlide += direction;
      
      // Loop around
      if (currentImportSlide >= importSlides.length) {
        currentImportSlide = 0;
      } else if (currentImportSlide < 0) {
        currentImportSlide = importSlides.length - 1;
      }
      
      showImportSlide(currentImportSlide);
      resetAutoPlay();
    }

    function goToImportSlide(index) {
      currentImportSlide = index;
      showImportSlide(currentImportSlide);
      resetAutoPlay();
    }

    function autoPlayImport() {
      changeImportSlide(1);
    }

    function resetAutoPlay() {
      clearInterval(importAutoPlay);
      importAutoPlay = setInterval(autoPlayImport, 4000);
    }

    // Previous/Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => changeImportSlide(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => changeImportSlide(1));
    }

    // Dot navigation listeners
    importDots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToImportSlide(index));
    });

    // Initialize first slide and start autoplay
    showImportSlide(0);
    importAutoPlay = setInterval(autoPlayImport, 4000);
  }
});
// ...existing code...