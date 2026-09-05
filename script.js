const menu = document.getElementById('sidemenu');
const menuButton = document.querySelector('.menu-toggle');

function toggleMenu(){
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
}

function closemenu(){
  menu.classList.remove('open');
  if(menuButton) menuButton.setAttribute('aria-expanded','false');
}

// Close mobile navigation after clicking outside.
document.addEventListener('click', (event) => {
  if (!menu || !menuButton) return;
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closemenu();
});

// Lightweight typewriter for the hero role.
const roles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Python Developer', 'Software Builder'];
const textElement = document.getElementById('changing-text');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){
  if(!textElement) return;
  const role = roles[roleIndex];
  textElement.textContent = role.slice(0, charIndex);
  if(!deleting){
    charIndex++;
    if(charIndex > role.length){
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  }else{
    charIndex--;
    if(charIndex < 0){
      charIndex = 0;
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

// Scroll reveal without requiring GSAP to be available.
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});
revealItems.forEach(item => observer.observe(item));

// Subtle pointer glow on desktop.
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if(glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
},{passive:true});

// Optional GSAP enhancement if the CDN is available.
if(window.gsap && window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.brand',{opacity:0,y:-12,duration:.7,ease:'power2.out'});
}
