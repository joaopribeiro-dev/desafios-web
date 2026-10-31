document.addEventListener('DOMContentLoaded', () => {

    // =================================
    // ANIMAÇÃO DOS CARDS
    // =================================

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.classList.add("card-scroll");
    });

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));

    // =================================
    // NAVEGAÇÃO ENTRE AS TELAS
    // =================================

    const telas = document.querySelector(".telas");
    const botoes = document.querySelectorAll(".btn-nav");

    botoes.forEach(botao => {

        botao.addEventListener('click', () => {

            const destino = botao.dataset.tela;

            telas.classList.toggle("sobre-ativa", destino === "sobre");

            botoes.forEach(btn => {

                btn.classList.toggle(
                    "ativo",
                    btn.dataset.tela === destino
                );

            });

        });

    });

});

    // =================================
    // ANIMAÇÃO DO FUNDO
    // =================================

const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

let stars = [];

const numStars = 500;

function createStars() {
    return {
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        radius: Math.random() * 1.5,
        alpha: Math.random() * 0.5 + 0.5
    }
}

for (let i = 0; i < numStars; i++) {
    let s = createStars();
    stars.push(s);
}

window.addEventListener('resize', ()=> {
    resizeCanvas();

    stars.forEach(star => {
        star.x = (Math.random() - 0.5) * canvas.width * 2;
        star.y = (Math.random() - 0.5) * canvas.height * 2;
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "screen";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(centerX + star.x, centerY + star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}
animate();