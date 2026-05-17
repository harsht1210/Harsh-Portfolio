
document.getElementById('year').textContent = new Date().getFullYear();

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let fx = 0, fy = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', (e) => {
    cx = e.clientX;
    cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
});

function animateFollower() {
    fx += (cx - fx) * 0.12;
    fy += (cy - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
    }
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
});

const typedEl = document.getElementById('typed');
const phrases = [
    'Full Stack Developer',
    'Django & React Dev',
    'UI/UX Enthusiast',
];
let pi = 0, ci = 0, deleting = false;

function typeEffect() {
    const phrase = phrases[pi];
    if (!deleting) {
        typedEl.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
        setTimeout(typeEffect, 65);
    } else {
        typedEl.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 35);
    }
}
typeEffect();

const revealEls = document.querySelectorAll(
    '.about-grid, .skills-card, .timeline-item, .project-card, .footer-top, .section-tag, .section-title, .section-subtitle'
);
revealEls.forEach(el => el.setAttribute('data-reveal', ''));

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), i * 60);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-item').forEach(item => item.classList.add('visible'));
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                setTimeout(() => fill.classList.add('animated'), 300);
            });
            skillObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-card').forEach(card => skillObs.observe(card));

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const cat = card.dataset.cat;
            if (filter === 'all' || cat === filter) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, transform 0.3s';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

const sections = document.querySelectorAll('section[id], .projects-section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const activeObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinkEls.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObs.observe(s));

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
