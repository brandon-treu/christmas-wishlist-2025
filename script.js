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
