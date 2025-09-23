// Future interactivity goes here
console.log('CoolCar website loaded.');

const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  toggle.classList.toggle('active');
});
