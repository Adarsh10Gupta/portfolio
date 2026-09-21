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

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

function copyEmail(){
  const email='adarsh10gupta@gmail.com';
  navigator.clipboard?.writeText(email).then(() => {
    const btn=document.querySelector('.copy-email');
    if(!btn) return;
    const original=btn.textContent;
    btn.textContent='Copied';
    setTimeout(()=>btn.textContent=original,1400);
  });
}

const caseData = {
  recoverai:{
    kicker:'PRODUCT · PAYMENT RELIABILITY',
    title:'RecoverAI',
    subtitle:'A payment reliability and recovery control plane built around real merchant failure scenarios.',
    problem:'Payment failures and checkout abandonment can become invisible operational problems when there is no single place to detect, score and act on recovery opportunities.',
    approach:'Designed a multi-tenant workflow around payment events, recovery scoring, action logging and verified metrics, with a deployed frontend and Node.js/Express API.',
    tech:'Vite · Node.js · Express · PostgreSQL · Razorpay Test Mode · Cloudflare',
    outcome:'A working deployed product prototype that turns payment events into an operational recovery workflow rather than a simple payment demo.',
    links:[['Open product','https://recoverai.pages.dev/'],['View source','https://github.com/Adarsh10Gupta/RecoverAI']]
  },
  fittronics:{
    kicker:'CLIENT · E-COMMERCE',
    title:'Fittronics',
    subtitle:'A multi-layer e-commerce system with a storefront, backend and admin dashboard.',
    problem:'The client needed a complete commerce experience rather than a static storefront — including product management, authentication, payments and administration.',
    approach:'Built separate frontend, backend and admin layers with APIs connecting the customer experience to operational tools and payment/media integrations.',
    tech:'Next.js · React · Node.js · Express · MySQL · Razorpay',
    outcome:'A pre-launch full-stack platform with a clear separation between customer-facing commerce and admin operations.',
    links:[['Preview','https://fittronics-next.vercel.app/'],['Frontend','https://github.com/Adarsh10Gupta/fittronics-next'],['Backend','https://github.com/Adarsh10Gupta/fittronics-backend']]
  },
  immigration:{
    kicker:'CLIENT · LIVE WEBSITE',
    title:'International Immigration',
    subtitle:'A service-focused website for overseas education, migration and language training.',
    problem:'Multiple services needed to be presented clearly while keeping the experience trustworthy and conversion-focused.',
    approach:'Structured the site around distinct service journeys, responsive layouts and backend integrations for a real client-facing deployment.',
    tech:'HTML · CSS · JavaScript · Node/Express · MongoDB · Responsive UI',
    outcome:'A live client website with clearer service discovery and a responsive experience across devices.',
    links:[['Open website','https://internationalimmigratn.com/'],['Frontend source','https://github.com/Adarsh10Gupta/Immigration']]
  },
  woven:{
    kicker:'CLIENT · E-COMMERCE',
    title:'WovenWonders',
    subtitle:'A visual gifting storefront focused on product discovery and custom orders.',
    problem:'A handcrafted gifting business needed an online experience that made browsing, personalization and custom ordering feel simple.',
    approach:'Focused the storefront around product discovery, filtering, custom-order flows and direct customer communication.',
    tech:'E-commerce · Product UX · Custom orders · WhatsApp',
    outcome:'A live storefront that gives the business a dedicated digital shopping experience.',
    links:[['Open website','https://wovenwonder.in/']]
  }
};
const caseModal=document.getElementById('caseModal');
function openCase(key){
  const d=caseData[key]; if(!d||!caseModal) return;
  document.getElementById('caseKicker').textContent=d.kicker;
  document.getElementById('caseTitle').textContent=d.title;
  document.getElementById('caseSubtitle').textContent=d.subtitle;
  document.getElementById('caseProblem').textContent=d.problem;
  document.getElementById('caseApproach').textContent=d.approach;
  document.getElementById('caseTech').textContent=d.tech;
  document.getElementById('caseOutcome').textContent=d.outcome;
  document.getElementById('caseActions').innerHTML=d.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noreferrer">${label} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`).join('');
  caseModal.classList.add('open');
  caseModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
document.querySelectorAll('.case-study-btn').forEach(btn=>btn.addEventListener('click',()=>openCase(btn.dataset.case)));
document.querySelectorAll('[data-close-case]').forEach(el=>el.addEventListener('click',closeCase));
function closeCase(){
  caseModal?.classList.remove('open');
  caseModal?.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCase();});

// Lightweight public GitHub activity.
async function loadGithubActivity(){
  const repoCount=document.getElementById('github-repos');
  const followers=document.getElementById('github-followers');
  const events=document.getElementById('github-events');
  if(!events) return;
  try{
    const [userRes, eventsRes]=await Promise.all([
      fetch('https://api.github.com/users/Adarsh10Gupta'),
      fetch('https://api.github.com/users/Adarsh10Gupta/events/public?per_page=6')
    ]);
    if(userRes.ok){
      const user=await userRes.json();
      if(repoCount) repoCount.textContent=user.public_repos ?? '—';
      if(followers) followers.textContent=user.followers ?? '—';
    }
    if(eventsRes.ok){
      const data=await eventsRes.json();
      const useful=data.filter(e=>['PushEvent','CreateEvent','PullRequestEvent','IssuesEvent'].includes(e.type)).slice(0,3);
      events.innerHTML=useful.length ? useful.map(e=>{
        const repo=e.repo?.name || 'GitHub';
        const type=e.type.replace('Event','').replace('PullRequest','Pull Request').replace('Push','Push').replace('Create','Create');
        const ref=e.payload?.ref || '';
        return `<article class="github-event"><span class="event-type">${type}</span><h3>${repo.split('/')[1]||repo}</h3><p>${ref ? 'Updated branch '+ref : 'Recent public activity on this repository.'}</p><a href="https://github.com/${repo}" target="_blank" rel="noreferrer">Open repository ↗</a></article>`;
      }).join('') : '<div class="github-loading">No recent public activity to display yet.</div>';
    }
  }catch(err){
    events.innerHTML='<div class="github-loading">GitHub activity is temporarily unavailable. <a href="https://github.com/Adarsh10Gupta" target="_blank" rel="noreferrer">Open GitHub ↗</a></div>';
  }
}
loadGithubActivity();
