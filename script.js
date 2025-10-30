document.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    document.querySelectorAll(".parallax").forEach(el => {
        el.querySelector("::before");
        el.style.setProperty("--scroll", scrolled);
        el.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
});

document.addEventListener("scroll", () => {
    document.querySelectorAll(".gift").forEach((gift, i) => {
        const speed = (i + 1) * 0.2; // each card moves differently
        gift.style.transform = `translateY(${window.scrollY * speed * -0.05}px)`;
    });
});

// Secret Wish toggle: reveals the hidden .gift.secret-wish when button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('secret-wish-btn');
    const secret = document.querySelector('.gift.secret-wish');
    if (!btn || !secret) return;

    btn.addEventListener('click', () => {
        const isShown = secret.classList.toggle('show');
        secret.setAttribute('aria-hidden', String(!isShown));
        btn.setAttribute('aria-expanded', String(isShown));
        btn.textContent = isShown ? 'Hide Secret Wish' : 'Secret Wish';
        // After toggling, smooth-scroll the secret into view when revealed
        if (isShown) {
            setTimeout(() => {
                secret.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
        }
    });
});

// Initialize simple carousel inside the secret wish
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.gift.secret-wish .carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.slide');
    const slidesWrap = carousel.querySelector('.slides');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let index = 0;
    let interval = null;

    function update() {
        slidesWrap.style.transform = `translateX(-${index * 100}%)`;
        const dots = dotsWrap.querySelectorAll('button');
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function go(n) {
        index = (n + slides.length) % slides.length;
        update();
    }

    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    // Create dots
    slides.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.title = `Slide ${i + 1}`;
        btn.addEventListener('click', () => { go(i); resetAuto(); });
        dotsWrap.appendChild(btn);
    });

    // Wire buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });

    function startAuto() {
        if (interval) return;
        interval = setInterval(next, 4000);
    }
    function stopAuto() { if (interval) { clearInterval(interval); interval = null; } }
    function resetAuto() { stopAuto(); startAuto(); }

    // Start auto only when the secret is shown; observe class changes
    const secret = document.querySelector('.gift.secret-wish');
    const obs = new MutationObserver(() => {
        if (secret.classList.contains('show')) startAuto(); else stopAuto();
    });
    obs.observe(secret, { attributes: true, attributeFilter: ['class'] });

    // initial update
    update();
    if (secret.classList.contains('show')) startAuto();
});
