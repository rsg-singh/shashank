const list = document.querySelectorAll('.list');
const navMenu = document.getElementById('ula');

function activeLink() {
    if (this.classList.contains('hamburger')) return;
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    if (navMenu) navMenu.classList.remove('open');
}

list.forEach((item) => item.addEventListener('click', activeLink));

const normalizePath = (value) => {
    if (!value) return '';
    return value.split('#')[0].split('?')[0].toLowerCase();
};

const setActiveLinkFromLocation = () => {
    if (!list.length) return;
    list.forEach((item) => item.classList.remove('active'));
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const current = normalizePath(currentFile);
    let matched = false;
    document.querySelectorAll('.nav-menu .list a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        if (normalizePath(href) === current) {
            link.closest('.list')?.classList.add('active');
            matched = true;
        }
    });
    if (!matched && current === '') {
        document.querySelector('.nav-menu .list a[href=\"index.html\"]')?.closest('.list')?.classList.add('active');
    }
};

const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.querySelector('.sun-toggle');
const moonIcon = document.querySelector('.moon-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (sunIcon) sunIcon.classList.toggle('hidden');
        if (moonIcon) moonIcon.classList.toggle('hidden');
    });
}

const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('open');
    });
}

if (navMenu && hamburger) {
    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('open')) return;
        if (navMenu.contains(event.target) || hamburger.contains(event.target)) return;
        navMenu.classList.remove('open');
    });
}

const text = document.querySelector('.sec-text');
const textLoad = () => {
    if (!text) return;
    setTimeout(() => {
        text.textContent = 'Shashank Singh Parihar';
    }, 0);
    setTimeout(() => {
        text.textContent = 'Freelancer';
    }, 4000);
    setTimeout(() => {
        text.textContent = 'Web Developer';
    }, 8000);
};
textLoad();
setInterval(textLoad, 12000);

const canvas = document.getElementById('particleCanvas');
let ctx;
if (canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let particlesArray = [];

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    if (!canvas) return;
    particlesArray = [];
    for (let i = 0; i < 90; i++) {
        const size = Math.random() * 3 + 0.8;
        const x = Math.random() * (window.innerWidth - size * 2);
        const y = Math.random() * (window.innerHeight - size * 2);
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = 'rgba(255, 255, 255, 0.6)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    if (!canvas || !ctx) return;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    if (navMenu && window.innerWidth > 794) navMenu.classList.remove('open');
});

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.about-section');
    const skillBars = document.querySelectorAll('.skill-level');

    if (!skillsSection) return;
    if (window.scrollY + window.innerHeight > skillsSection.offsetTop) {
        skillBars.forEach((skillBar) => {
            if (skillBar.classList.contains('js')) {
                skillBar.style.width = '90%';
            } else if (skillBar.classList.contains('react')) {
                skillBar.style.width = '85%';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setActiveLinkFromLocation();
    setTimeout(() => {
        document.body.classList.add('show-content');
    }, 2600);
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    },
    { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            if (entry.boundingClientRect.top < 100) {
                entry.target.style.transform = `scale(${0.95 + ratio * 0.05})`;
                entry.target.style.opacity = `${0.5 + ratio * 0.5}`;
            } else {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    },
    {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: '0px 0px -100px 0px',
    }
);

document.querySelectorAll('.page').forEach((page) => observer.observe(page));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroSurface = document.querySelector('.parallax-surface');
const parallaxItems = document.querySelectorAll('.parallax-item');

if (heroSurface && parallaxItems.length && !prefersReducedMotion) {
    heroSurface.addEventListener('mousemove', (event) => {
        const rect = heroSurface.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        parallaxItems.forEach((item) => {
            const depth = Number(item.dataset.depth || 10);
            const rotateX = y * depth * -1;
            const rotateY = x * depth;
            item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
    });

    heroSurface.addEventListener('mouseleave', () => {
        parallaxItems.forEach((item) => {
            item.style.transform = '';
        });
    });
}
