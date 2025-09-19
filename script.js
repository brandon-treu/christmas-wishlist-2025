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
