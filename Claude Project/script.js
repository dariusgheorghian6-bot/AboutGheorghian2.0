/* ──────────────────────────────────────────────────────────────
   2. NAVBAR — glass effect on scroll
   window.scrollY gives us how many pixels from the top.
   We toggle the .scrolled class which adds the blur in CSS.
────────────────────────────────────────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    // classList.toggle(class, condition) adds if true, removes if false
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true }); // passive: true = tells browser we won't call preventDefault, so it can optimise


/* ──────────────────────────────────────────────────────────────
   3. MOBILE HAMBURGER MENU
   Clicking the burger toggles .open on the nav links (shows them)
   and .open on the burger itself (animates it to an X).
────────────────────────────────────────────────────────────── */
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close the menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});


/* ──────────────────────────────────────────────────────────────
   4. SCROLL REVEAL — Intersection Observer API
   The Intersection Observer is a browser API that fires a callback
   whenever a watched element enters or exits the viewport.
   It's far more efficient than checking on every scroll event.
────────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is on screen — add .visible to trigger CSS
            entry.target.classList.add('visible');
            // Stop watching once revealed (we don't need to un-reveal)
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,                 // Fire when 10% of the element is visible
    rootMargin: '0px 0px -40px 0px' // Trigger 40px before the element hits the bottom edge
});

// Watch every element that should animate in
document.querySelectorAll('.reveal, .stagger').forEach(el => {
    revealObserver.observe(el);
});


/* ──────────────────────────────────────────────────────────────
   5. TYPEWRITER EFFECT
   We cycle through an array of phrases, typing and deleting.
   setTimeout schedules the next character after a delay.
────────────────────────────────────────────────────────────── */
const tw = document.getElementById('typewriter');

// EDIT THIS: Change these phrases to match your skills
const phrases = [
    'scalable web apps',
    'fast, clean APIs',
    'pixel-perfect UIs',
    'great user experiences',
    'your next project'
];

let phraseIdx  = 0;      // Current phrase index
let charIdx    = 0;      // Current character within phrase
let deleting   = false;  // Typing or erasing?

function typeLoop() {
    const phrase = phrases[phraseIdx];

    if (deleting) {
        tw.textContent = phrase.slice(0, charIdx - 1); // Remove last char
        charIdx--;
    } else {
        tw.textContent = phrase.slice(0, charIdx + 1); // Add next char
        charIdx++;
    }

    let wait = deleting ? 45 : 85; // Erase faster than type

    if (!deleting && charIdx === phrase.length) {
        // Done typing → pause, then start deleting
        wait = 2200;
        deleting = true;
    } else if (deleting && charIdx === 0) {
        // Done deleting → move to next phrase
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        wait = 450;
    }

    setTimeout(typeLoop, wait);
}

// Start after the hero entrance animations have played
setTimeout(typeLoop, 1800);


/* ──────────────────────────────────────────────────────────────
   6. COUNTER ANIMATION
   When the stats enter view, numbers count up from 0 to target.
   requestAnimationFrame is the browser's animation loop — it
   syncs to the display refresh rate (usually 60fps) for silky
   smooth motion. Much better than setInterval for animation.
────────────────────────────────────────────────────────────── */
function runCounter(el, target, duration = 1400) {
    const startTime = performance.now(); // High-res timestamp in ms

    function tick(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 → 1

        // Easing function: fast at first, slows near end (satisfying)
        // easeOutQuart: 1 - (1-t)^4
        const eased = 1 - Math.pow(1 - progress, 4);

        el.textContent = Math.round(eased * target) + '+';

        if (progress < 1) requestAnimationFrame(tick); // Keep going
    }

    requestAnimationFrame(tick); // Kick off the first frame
}

// Use a separate observer for the counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count, 10);
            runCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // 50% visible before counting starts

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));


/* ──────────────────────────────────────────────────────────────
   7. CONTACT FORM
   e.preventDefault() stops the page from reloading on submit
   (the browser's default form behaviour).
   In production swap this out for Formspree / EmailJS / your API.
────────────────────────────────────────────────────────────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault(); // Don't reload the page

    // Visual feedback — button turns green
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.classList.add('btn-success');
    submitBtn.disabled = true;

    // Reset after 3.5 seconds
    setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.classList.remove('btn-success');
        submitBtn.disabled = false;
        form.reset(); // Clear all input fields
    }, 3500);
});