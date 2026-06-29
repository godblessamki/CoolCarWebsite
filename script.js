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
let indexSlides = [];
let indexDots = [];
let currentSlideIndex = 0;
let indexAutoPlayInterval;

function showSlide(index) {
  indexSlides.forEach(slide => slide.classList.remove('active'));
  indexDots.forEach(dot => dot.classList.remove('active'));
  if (indexSlides[index]) {
    indexSlides[index].classList.add('active');
    if (indexDots[index]) indexDots[index].classList.add('active');
  }
}

function changeSlide(direction) {
  if (indexSlides.length === 0) return;
  currentSlideIndex += direction;
  if (currentSlideIndex >= indexSlides.length) currentSlideIndex = 0;
  else if (currentSlideIndex < 0) currentSlideIndex = indexSlides.length - 1;
  showSlide(currentSlideIndex);
  resetIndexAutoPlay();
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
  resetIndexAutoPlay();
}

function autoPlay() {
  changeSlide(1);
}

function resetIndexAutoPlay() {
  clearInterval(indexAutoPlayInterval);
  indexAutoPlayInterval = setInterval(autoPlay, 5000);
}

function initDynamicCarousel(folder, containerSelector, dotContainerSelector, isImport) {
    const container = document.querySelector(containerSelector);
    const dotContainer = document.querySelector(dotContainerSelector);
    if (!container || !dotContainer) return;

    let idx = 1;
    
    function tryLoadImage() {
        const imgPath = `${folder}/${idx}.webp`;
        const img = new Image();
        
        img.onload = function() {
            const activeClass = idx === 1 ? ' active' : '';
            if (isImport) {
                const slide = document.createElement('div');
                slide.className = `import-carousel-slide${activeClass}`;
                slide.style.backgroundImage = `url('${imgPath}')`;
                const overlay = container.querySelector('.import-carousel-overlay');
                if (overlay) {
                    container.insertBefore(slide, overlay);
                } else {
                    container.appendChild(slide);
                }

                const dot = document.createElement('span');
                dot.className = `import-dot${activeClass}`;
                dotContainer.appendChild(dot);
            } else {
                const slide = document.createElement('div');
                slide.className = `slide${activeClass}`;
                slide.innerHTML = `<img src="${imgPath}" alt="Slide ${idx}">`;
                container.appendChild(slide);

                const dot = document.createElement('span');
                dot.className = `dot${activeClass}`;
                dot.setAttribute('onclick', `currentSlide(${idx})`);
                dotContainer.appendChild(dot);
            }
            
            idx++;
            tryLoadImage();
        };
        
        img.onerror = function() {
            // Finished loading images
            if (idx > 1) {
                if (isImport) {
                    startImportCarousel();
                } else {
                    startIndexCarousel();
                }
            }
        };
        
        img.src = imgPath;
    }
    
    tryLoadImage();
}

function startIndexCarousel() {
    indexSlides = document.querySelectorAll('.slide');
    indexDots = document.querySelectorAll('.dot');
    
    // Add navigation click listeners (if we replaced HTML it might not have onclick)
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    // We kept onclick attributes in index.html for buttons, but it's safe to keep the logic
    
    if (indexSlides.length > 0) {
        showSlide(0);
        indexAutoPlayInterval = setInterval(autoPlay, 5000);
    }
}

// Import Page Carousel Logic
let importSlides = [];
let importDots = [];
let currentImportSlide = 0;
let importAutoPlay;

function showImportSlide(index) {
  importSlides.forEach(slide => slide.classList.remove('active'));
  importDots.forEach(dot => dot.classList.remove('active'));
  if (importSlides[index]) {
      importSlides[index].classList.add('active');
      if (importDots[index]) importDots[index].classList.add('active');
  }
}

function changeImportSlide(direction) {
  if (importSlides.length === 0) return;
  currentImportSlide += direction;
  if (currentImportSlide >= importSlides.length) currentImportSlide = 0;
  else if (currentImportSlide < 0) currentImportSlide = importSlides.length - 1;
  showImportSlide(currentImportSlide);
  resetImportAutoPlay();
}

function goToImportSlide(index) {
  currentImportSlide = index;
  showImportSlide(currentImportSlide);
  resetImportAutoPlay();
}

function autoPlayImport() {
  changeImportSlide(1);
}

function resetImportAutoPlay() {
  clearInterval(importAutoPlay);
  importAutoPlay = setInterval(autoPlayImport, 4000);
}

function startImportCarousel() {
    importSlides = document.querySelectorAll('.import-carousel-slide');
    importDots = document.querySelectorAll('.import-dot');
    
    const prevBtn = document.querySelector('.import-prev');
    const nextBtn = document.querySelector('.import-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeImportSlide(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeImportSlide(1));
    
    importDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToImportSlide(index));
    });

    if (importSlides.length > 0) {
        showImportSlide(0);
        importAutoPlay = setInterval(autoPlayImport, 4000);
    }
}

// Initialize both on load
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.hero-slider')) {
        initDynamicCarousel('images/index-carousel', '.hero-slider', '.slider-dots', false);
    }
    if (document.querySelector('.import-carousel-container')) {
        initDynamicCarousel('images/import-carousel', '.import-carousel-container', '.import-slider-dots', true);
    }
});
// ...existing code...

// Contact Form - Submit via fetch so user stays on the page
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formStatus = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Odesílání...';
    formStatus.style.display = 'none';
    formStatus.classList.remove('success', 'error');

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        formStatus.textContent = '✅ Vaše zpráva byla úspěšně odeslána! Ozveme se vám co nejdříve.';
        formStatus.classList.add('success');
        form.reset();
      } else {
        formStatus.textContent = '❌ Něco se pokazilo. Zkuste to prosím znovu.';
        formStatus.classList.add('error');
      }
      formStatus.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    })
    .catch(() => {
      formStatus.textContent = '❌ Chyba připojení. Zkuste to prosím znovu.';
      formStatus.classList.add('error');
      formStatus.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Animated Counters
const counterElements = document.querySelectorAll('.counter-number');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalWord = target.getAttribute('data-text') || 'STOVKY';
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let iteration = 0;
      
      const counterInterval = setInterval(() => {
        target.innerText = finalWord
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return finalWord[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
        
        if(iteration >= finalWord.length){ 
          clearInterval(counterInterval);
          observer.unobserve(target);
        }
        
        iteration += 1 / 8; // Controls reveal speed
      }, 30);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));