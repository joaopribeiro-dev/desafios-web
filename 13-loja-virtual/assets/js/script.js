const form = document.getElementById("formCarrinho");
const campoQuantidade = document.getElementById("quantidade");
const mensagem = document.getElementById("mensagem");

if (form &&campoQuantidade && mensagem) {
    form.addEventListener('submit', (evento)=> {
        const quantidade = Number(campoQuantidade.value);
        
        const minimo = Number(campoQuantidade.min);
        const maximo = Number(campoQuantidade.max);

        if (!Number.isInteger(quantidade) || quantidade < minimo || quantidade > maximo) {
            evento.preventDefault();

            mensagem.textContent = "Informe uma quantidade válida!";
            mensagem.style.color = "#dc2626";
            return;
        }

        mensagem.textContent = `${quantidade} unidades(s) selecionada(s) para o carrinho!`;
        mensagem.style.color = "#16a34a";
    });
}