// Future interactivity goes here
console.log('CoolCar website loaded.');

const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });
}
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
// ===== MODERNIZATION & RESPONSIVE FEATURES =====

// 1. Header scroll-shrink — adds .scrolled class when page is scrolled >60px
(function () {
  var headerEl = document.querySelector('header');
  if (!headerEl) return;
  function onScroll() {
    headerEl.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
}());

// 2. Auto-detect active nav link based on current page filename
(function () {
  var raw = window.location.pathname.split('/').pop();
  var page = (raw === '' || raw === undefined) ? 'index.html' : raw;
  document.querySelectorAll('nav a').forEach(function (link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });
}());

// 3. Close mobile nav when any nav link is clicked
document.querySelectorAll('#main-nav a').forEach(function (link) {
  link.addEventListener('click', function () {
    var navEl = document.getElementById('main-nav');
    var toggleEl = document.getElementById('menu-toggle');
    if (navEl) navEl.classList.remove('open');
    if (toggleEl) toggleEl.classList.remove('active');
  });
});

// 4. Scroll-reveal with IntersectionObserver
// Elements gain .reveal (hidden) when JS loads, then .visible when they enter the viewport.
// Falls back gracefully if IntersectionObserver is unsupported.
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.card, .about-section, .import-section, .contact-grid, .sales-content'
  );
  if (!targets.length) return;

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());
