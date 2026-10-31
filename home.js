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