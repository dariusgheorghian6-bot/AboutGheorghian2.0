/* ══════════════════════════════════════════════════════════════
   main.js  —  Personal Landing Page
   Sections:
     1.  Translations (i18n)
     2.  Language switcher
     3.  Scroll progress bar
     4.  Nav glass + mobile menu
     5.  Scroll reveal (Intersection Observer)
     6.  Split-text word reveal
     7.  Letter scramble
     8.  Typewriter
     9.  Counter animation
    10.  Floating particles
    11.  Mouse parallax
    12.  3-D card tilt
    13.  Magnetic buttons
    14.  Click ripple
    15.  Contact form
══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   1. TRANSLATIONS
   All page text lives here in two languages.
   Keys match data-i18n="key" in index.html.

   Three types:
     • t.en.key / t.ro.key        → plain text (textContent)
     • t.en.key with <em>/<strong> → set via innerHTML (data-i18n-html)
     • t.en.key in "placeholders" → set on input.placeholder
     • t.en.phrases               → typewriter phrase array

   EDIT: swap in your real bio text in both languages.
───────────────────────────────────────────────────────────── */
const t = {
    en: {
        /* Nav */
        nav_about:    'About',
        nav_services: 'Services',
        nav_contact:  'Contact',

        /* Hero */
        hero_badge:      'Available for projects',
        hero_sub_before: 'I craft',
        hero_sub_after:  'for ambitious people.',
        hero_cta_work:   'View My Work →',
        hero_cta_hire:   'Hire Me',
        scroll:          'Scroll',

        /* About */
        about_eyebrow: 'About Me',
        about_title:   'Crafting <em>digital products</em> that leave a mark',
        about_p1:      "Hey, I'm Darius Gheorghian — a developer based in Bucharest, Romania, passionate about coding and crafting modern web experiences..",
        about_p2:      "With 1.5 years of hands-on experience in web design, I turn ideas into clean, functional, and engaging digital products. I'm driven by building solutions that combine thoughtful design, solid engineering, and exceptional user experiences.",
        about_p3:      "When I'm not building projects, you'll find me exploring emerging technologies, or continuously learning new tools and frameworks to improve my craft.",
        about_cta:     "Let's Work Together →",
        photo_placeholder: 'Your Photo',

        /* Services */
        services_eyebrow: 'What I Do',
        services_title:   'Services I <em>offer</em>',
        s1_title: 'Frontend Development',
        s1_desc:  'Pixel-perfect, responsive interfaces built with modern frameworks. React, Vue, or vanilla — fast, accessible UIs.',
        s2_title: 'Hosting',
        s2_desc:  'Scalable Server-as-a-Service hosting, secure deployment environments, and managed infrastructure architecture.',
        s3_title: ' business overview ',
        s3_desc:  "I carefully analyze your business and brand to craft a website that reflects your company's unique identity while delivering a cohesive and professional online presence.",
        s4_title: 'Consulting & Review',
        s4_desc:  'Architecture reviews, performance audits, and technical consulting for teams that want to level up.',

        /* Contact */
        contact_eyebrow:    'Get In Touch',
        contact_title:      'Ready to build <em>something great?</em>',
        contact_sub:        "I'm currently open to new freelance projects. Whether you have a detailed brief, a rough idea, or just want to explore possibilities — I'd love to hear from you.",
        form_name_label:    'Your Name',
        form_name_ph:       'John Smith',
        form_email_label:   'Email Address',
        form_email_ph:      'john@company.com',
        form_subject_label: 'Subject',
        form_subject_ph:    'Project idea, consultation, collab...',
        form_message_label: 'Message',
        form_message_ph:    "Tell me about your project — budget, timeline, and what you're building.",
        form_submit:        'Send Message →',
        form_success:       'Message Sent ✓',
        social_email:       'Email Me',

        /* Footer */
        footer: '© 2025 Your Name — Designed & built with care',

        /* Typewriter phrases */
        phrases: [
            'scalable web apps',
            'fast, clean APIs',
            'pixel-perfect UIs',
            'great user experiences',
            'your next project'
        ]
    },

    ro: {
        /* Nav */
        nav_about:    'Despre',
        nav_services: 'Servicii',
        nav_contact:  'Contact',

        /* Hero */
        hero_badge:      'Disponibil pentru proiecte',
        hero_sub_before: 'Creez',
        hero_sub_after:  'pentru oameni ambițioși.',
        hero_cta_work:   'Vezi Lucrările →',
        hero_cta_hire:   'Angajează-mă',
        scroll:          'Derulează',

        /* About */
        about_eyebrow: 'Despre Mine',
        about_title:   'Creând <em>produse digitale</em> care lasă o amprentă',
        about_p1:      'Salut, sunt Darius Gheorghian — un dezvoltator din București, România, pasionat de programare și de crearea experiențelor web moderne.',
        about_p2:      'Cu 1,5 ani de experiență practică în web design, transform ideile în produse digitale curate, funcționale și captivante. Sunt motivat de construirea unor soluții care îmbină designul atent, ingineria solidă și experiențele excepționale pentru utilizatori.',
        about_p3:      'Când nu lucrez la proiecte, mă găsești explorând tehnologii emergente sau învățând continuu noi instrumente și framework-uri pentru a-mi perfecționa abilitățile.',
        about_cta:     'Hai să Colaborăm →',
        photo_placeholder: 'Fotografia Ta',

        /* Services */
        services_eyebrow: 'Ce Fac',
        services_title:   'Serviciile mele <em>disponibile</em>',
        s1_title: 'Dezvoltare Frontend',
        s1_desc:  'Interfețe responsive, pixel-perfect, construite cu framework-uri moderne. React, Vue sau vanilla — UI-uri rapide și accesibile.',
        s2_title: 'Hosting',
        s2_desc:  'Găzduire scalabilă de tip „Server-as-a-Service”, medii de implementare sigure și arhitectură de infrastructură gestionată.',
        s3_title: 'Studierea afacerii',
        s3_desc:  'Analizez cu atenție afacerea și marca dumneavoastră pentru a crea un site web care să reflecte identitatea unică a companiei dumneavoastră, oferind în același timp o prezență online coerentă și profesională.',
        s4_title: 'Consultanță & Audit',
        s4_desc:  'Revizuiri de arhitectură, audituri de performanță și consultanță tehnică pentru echipe care vor să evolueze.',

        /* Contact */
        contact_eyebrow:    'Ia Legătura',
        contact_title:      'Pregătit să construim <em>ceva măreț?</em>',
        contact_sub:        'Sunt disponibil pentru proiecte freelance noi. Fie că ai un brief detaliat, o idee vagă sau vrei doar să explorezi posibilitățile — aș fi bucuros să aud de tine.',
        form_name_label:    'Numele Tău',
        form_name_ph:       'Ion Popescu',
        form_email_label:   'Adresă de Email',
        form_email_ph:      'ion@companie.ro',
        form_subject_label: 'Subiect',
        form_subject_ph:    'Idee de proiect, consultanță, colaborare...',
        form_message_label: 'Mesaj',
        form_message_ph:    'Spune-mi despre proiectul tău — buget, termen și ce construiești.',
        form_submit:        'Trimite Mesaj →',
        form_success:       'Mesaj Trimis ✓',
        social_email:       'Trimite Email',

        /* Footer */
        footer: '© 2025 Numele Tău — Proiectat & construit cu grijă',

        /* Typewriter phrases */
        phrases: [
            'aplicații web scalabile',
            'API-uri rapide și curate',
            'interfețe pixel-perfect',
            'experiențe de utilizator',
            'proiectul tău următor'
        ]
    }
};


/* ─────────────────────────────────────────────────────────────
   2. LANGUAGE SWITCHER

   How it works:
   a) The current language is stored on <html data-active-lang="en">.
      CSS uses this attribute to highlight the active flag in gold.
   b) applyLang(lang) iterates three sets of elements:
        • [data-i18n]             → sets textContent
        • [data-i18n-html]        → sets innerHTML (preserves <em> etc.)
        • [data-i18n-placeholder] → sets input/textarea placeholder
   c) Split-text headings need to be re-processed after the text
      changes so the word-rise animation works in both languages.
   d) The typewriter is restarted with the new phrase list.
   e) A 180ms body opacity crossfade hides the text swap visually.
───────────────────────────────────────────────────────────── */
let currentLang = 'en';

function applyLang(lang) {
    const strings = t[lang];

    /* — plain text — */
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (strings[key] !== undefined) el.textContent = strings[key];
    });

    /* — innerHTML (elements containing <em>, <strong>, etc.) — */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.dataset.i18nHtml;
        if (strings[key] !== undefined) {
            el.innerHTML = strings[key];
        }
    });

    /* — input / textarea placeholders — */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (strings[key] !== undefined) el.placeholder = strings[key];
    });

    /* — update <html lang="..."> for accessibility and SEO — */
    document.documentElement.lang = lang;
    document.documentElement.dataset.activeLang = lang;

    /* — restart typewriter with new language phrases — */
    currentPhrases = strings.phrases;
    resetTypewriter();
}

function switchLang() {
    const next = currentLang === 'en' ? 'ro' : 'en';

    /*
      Crossfade: fade the body out, swap text, fade back in.
      The CSS transition on body handles the smooth fade.
    */
    document.body.classList.add('lang-switching');

    setTimeout(() => {
        applyLang(next);
        currentLang = next;
        document.body.classList.remove('lang-switching');
    }, 180); /* matches the fade-out duration in CSS */
}

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', switchLang);

/* Set initial state */
document.documentElement.dataset.activeLang = 'en';


/* ─────────────────────────────────────────────────────────────
   3. SCROLL PROGRESS BAR
───────────────────────────────────────────────────────────── */
const progressBar = document.getElementById('progressBar');

function updateProgress() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });


/* ─────────────────────────────────────────────────────────────
   4. NAV — glass blur on scroll + mobile menu
───────────────────────────────────────────────────────────── */
const nav       = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});


/* ─────────────────────────────────────────────────────────────
   5. SCROLL REVEAL — Intersection Observer
───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger'
).forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────────────────────
   6. LETTER SCRAMBLE
───────────────────────────────────────────────────────────── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function scrambleIn(el) {
    const original = el.textContent;
    const len      = original.length;
    let   revealed = 0;
    let   frame    = 0;

    function tick() {
        frame++;
        if (frame % 3 === 0 && revealed < len) revealed++;

        el.textContent = original.split('').map((char, i) => {
            if (i < revealed) return char;
            if (char === ' ')  return ' ';
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('');

        if (revealed < len) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrambleIn(entry.target);
            scrambleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-scramble]').forEach(el => {
    scrambleObserver.observe(el);
});


/* ─────────────────────────────────────────────────────────────
   8. TYPEWRITER
   currentPhrases is a module-level variable so the lang
   switcher can replace it, then call resetTypewriter().
───────────────────────────────────────────────────────────── */
const tw = document.getElementById('typewriter');
let currentPhrases = t.en.phrases;
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let typeTimer = null;

function typeLoop() {
    const phrase = currentPhrases[phraseIdx];

    if (deleting) {
        tw.textContent = phrase.slice(0, charIdx - 1);
        charIdx--;
    } else {
        tw.textContent = phrase.slice(0, charIdx + 1);
        charIdx++;
    }

    let wait = deleting ? 42 : 80;

    if (!deleting && charIdx === phrase.length) {
        wait = 2300; deleting = true;
    } else if (deleting && charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % currentPhrases.length;
        wait      = 480;
    }

    typeTimer = setTimeout(typeLoop, wait);
}

function resetTypewriter() {
    /* Stop any running loop, reset state, restart */
    clearTimeout(typeTimer);
    phraseIdx = 0;
    charIdx   = 0;
    deleting  = false;
    tw.textContent = '';
    typeTimer = setTimeout(typeLoop, 300);
}

setTimeout(typeLoop, 1900);


/* ─────────────────────────────────────────────────────────────
   10. FLOATING PARTICLES
───────────────────────────────────────────────────────────── */
function spawnParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 28; i++) {
        const dot  = document.createElement('div');
        dot.className = 'particle';
        const size = 2 + Math.random() * 3;
        dot.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random() * 100}%;
            top:${30 + Math.random() * 70}%;
            animation-duration:${6 + Math.random() * 12}s;
            animation-delay:${Math.random() * 10}s;
        `;
        container.appendChild(dot);
    }
}
spawnParticles();


/* ─────────────────────────────────────────────────────────────
   11. MOUSE PARALLAX — hero orb depth effect
───────────────────────────────────────────────────────────── */
const parallaxEls = document.querySelectorAll('[data-parallax-speed]');

document.addEventListener('mousemove', e => {
    const cx = e.clientX / window.innerWidth  - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;

    parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.04;
        el.style.transform = `translate(
            calc(-50% + ${cx * window.innerWidth  * speed}px),
            calc(-50% + ${cy * window.innerHeight * speed}px)
        )`;
    });
}, { passive: true });


/* ─────────────────────────────────────────────────────────────
   12. 3-D CARD TILT
   Cards tilt toward the cursor with a moving specular highlight.
───────────────────────────────────────────────────────────── */
function initTilt() {
    document.querySelectorAll('.tilt').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect  = card.getBoundingClientRect();
            const xNorm = ((e.clientX - rect.left)  / rect.width)  - 0.5;
            const yNorm = ((e.clientY - rect.top)   / rect.height) - 0.5;

            card.style.transform =
                `perspective(900px) rotateX(${-yNorm * 12}deg) rotateY(${xNorm * 12}deg) scale(1.025)`;

            card.style.setProperty('--mx', ((e.clientX - rect.left)  / rect.width)  * 100 + '%');
            card.style.setProperty('--my', ((e.clientY - rect.top)   / rect.height) * 100 + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}
initTilt();


/* ─────────────────────────────────────────────────────────────
   13. MAGNETIC BUTTONS
   Buttons drift toward the cursor, snap back on leave.
───────────────────────────────────────────────────────────── */
function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect    = btn.getBoundingClientRect();
            const dx      = e.clientX - (rect.left + rect.width  / 2);
            const dy      = e.clientY - (rect.top  + rect.height / 2);
            btn.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}
initMagnetic();


/* ─────────────────────────────────────────────────────────────
   14. CLICK RIPPLE — ink-spread wave on every button click
───────────────────────────────────────────────────────────── */
function initRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.8;
            const x    = e.clientX - rect.left  - size / 2;
            const y    = e.clientY - rect.top   - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
}
initRipple();


/* ─────────────────────────────────────────────────────────────
   15. CONTACT FORM — Formspree AJAX (no redirect)
   fetch() posts the data in the background. The page never
   leaves. We show success/error feedback ourselves.
───────────────────────────────────────────────────────────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async e => {
    e.preventDefault(); // stop the browser navigating away

    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    try {
        const res = await fetch(form.action, {
            method:  'POST',
            body:    new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            /* Success */
            submitBtn.textContent = t[currentLang].form_success;
            submitBtn.classList.add('btn-success');
            form.reset();

            /* Reset button after 3.5 s */
            setTimeout(() => {
                submitBtn.textContent = t[currentLang].form_submit;
                submitBtn.classList.remove('btn-success');
                submitBtn.disabled = false;
            }, 3500);
        } else {
            /* Formspree returned an error */
            submitBtn.textContent = '✕ Try again';
            submitBtn.style.background = 'linear-gradient(135deg,#7f1d1d,#991b1b)';
            submitBtn.style.color = '#fecaca';
            setTimeout(() => {
                submitBtn.textContent = t[currentLang].form_submit;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch {
        /* Network error */
        submitBtn.textContent = '✕ No connection';
        setTimeout(() => {
            submitBtn.textContent = t[currentLang].form_submit;
            submitBtn.disabled = false;
        }, 3000);
    }
});

/* Apply the saved/default language text on first load */
applyLang(currentLang);
