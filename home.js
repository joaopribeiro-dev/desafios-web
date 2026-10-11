document.addEventListener('DOMContentLoaded', ()=> {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => card.classList.add("card-scroll"));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.15});

    cards.forEach(card => observer.observe(card));
})