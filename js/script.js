/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('menu-icon');
const navbar  = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const icon = menuBtn.querySelector('[data-lucide]');
    if (icon) icon.setAttribute('data-lucide', navbar.classList.contains('open') ? 'x' : 'menu');
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

// Close on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuBtn.querySelector('[data-lucide]');
        if (icon) icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove('open');
        const icon = menuBtn.querySelector('[data-lucide]');
        if (icon) icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

/* ===== DARK MODE ===== */
const darkBtn = document.getElementById('darkmode');
const html    = document.documentElement;

const saved = localStorage.getItem('theme');
if (saved) {
    html.setAttribute('data-theme', saved);
    const icon = darkBtn.querySelector('[data-lucide]');
    if (icon && saved === 'dark') icon.setAttribute('data-lucide', 'sun');
}

darkBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const icon = darkBtn.querySelector('[data-lucide]');
    if (icon) icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

/* ===== TYPING ANIMATION ===== */
const typingData = [
    { el: document.querySelector('.home-name'), text: 'Surya Prakash Singh' },
    { el: document.querySelector('.home-role'), text: 'Web Developer & Founder - Team TechPro' },
    { el: document.querySelector('.home-desc'), text: 'I build responsive, user-friendly websites and web applications using modern technologies.' }
];

let step = 0;

function typeNext() {
    if (step >= typingData.length) return;
    const { el, text } = typingData[step];
    if (!el) { step++; typeNext(); return; }
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
            clearInterval(interval);
            step++;
            setTimeout(typeNext, 400);
        }
    }, step === 0 ? 60 : step === 1 ? 55 : 18);
}

window.addEventListener('load', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
    typeNext();
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        btn.disabled = true;

        try {
            const res    = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm) });
            const result = await res.json();
            if (result.success) {
                formMessage.textContent = '✓ Message sent! I\'ll get back to you soon.';
                formMessage.className   = 'message success';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong.');
            }
        } catch (err) {
            formMessage.textContent = '✕ ' + (err.message || 'Failed to send. Please try again.');
            formMessage.className   = 'message error';
        } finally {
            formStatus.style.display = 'block';
            btn.innerHTML = orig;
            btn.disabled  = false;
            setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
        }
    });
}
