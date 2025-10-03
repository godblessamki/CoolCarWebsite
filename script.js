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

// ...existing code...