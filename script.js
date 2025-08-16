// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 100) header.classList.add('header-scrolled');
  else header.classList.remove('header-scrolled');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Cerrar menú móvil al navegar
      closeMobileMenu();
    }
  });
});

// Particles background (simple)
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    const size = Math.random() * 10 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.background = 'rgba(34, 197, 94, 0.5)';
    p.style.borderRadius = '50%';
    p.style.top = `${Math.random() * 100}%`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
    p.style.zIndex = '-1';
    p.style.animation = `float ${Math.random() * 20 + 10}s infinite ease-in-out`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(p);
  }
}

// Intersection animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (entry.target.classList.contains('service-card') ||
          entry.target.classList.contains('gallery-item') ||
          entry.target.classList.contains('contact-form') ||
          entry.target.classList.contains('card-animate')) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.service-card, .gallery-item, .contact-form, .card-animate').forEach(el => observer.observe(el));
}

// Simple form submission UX
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Chef Ezequiel se pondrá en contacto contigo muy pronto.');
    form.reset();
  });
}

// --------- Menú móvil (Hamburguesa) ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

function openMobileMenu() {
  document.body.classList.add('menu-open', 'menu-lock', 'nav-open');
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  document.body.classList.remove('menu-open', 'menu-lock', 'nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) closeMobileMenu();
    else openMobileMenu();
  });

  // Cerrar al click fuera
  document.addEventListener('click', (e) => {
    const header = document.getElementById('header');
    const withinHeader = header.contains(e.target);
    const menuOpen = document.body.classList.contains('menu-open');
    if (menuOpen && !withinHeader) closeMobileMenu();
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollAnimations();
});
