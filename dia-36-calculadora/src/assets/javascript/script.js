const botoesNum = document.querySelectorAll(".num");
const display = document.getElementById("display");

const btnAdicao = document.getElementById("adicao");
const btnSubtracao = document.getElementById("subtracao");
const btnMultiplicacao = document.getElementById("multiplicacao");
const btnDivisao = document.getElementById("divisao");
const btnPonto = document.getElementById("ponto");
const btnIgual = document.getElementById("igual");
const btnLimpar = document.getElementById("limpar");

let valorAnterior = "";
let operador = null;
let aguardeNum = false;

botoesNum.forEach((botao) => {
    botao.addEventListener('click', ()=> {
        const valor = botao.innerText;
        
        if (display.innerText === "0" || aguardeNum) {
            display.innerText = valor;
            aguardeNum = false;
        } else {
            display.innerText += valor;
        }
    })
})

btnPonto.addEventListener('click', ()=> {
    if (!display.innerText.includes(".")) {
        display.innerText += ".";
    }
})

function selecionarOperador(op) {
    valorAnterior = parseFloat(display.innerText);
    operador = op;
    aguardeNum = true;
}

btnAdicao.addEventListener('click', ()=> selecionarOperador("+"));
btnSubtracao.addEventListener('click', ()=> selecionarOperador("-"));
btnMultiplicacao.addEventListener('click', ()=> selecionarOperador("x"));
btnDivisao.addEventListener('click', ()=> selecionarOperador("/"));

btnIgual.addEventListener('click', ()=> {
    if (operador === null || aguardeNum) return;

    const valorAtual = parseFloat(display.innerText);
    let resultado = 0;

    switch (operador) {
        case "+":
            resultado = valorAnterior + valorAtual;
            break;
        case "-":
            resultado = valorAnterior - valorAtual;
            break;
        case "x":
            resultado = valorAnterior * valorAtual;
            break;
        case "/":
            resultado = valorAtual === 0 ? "Erro" : valorAnterior / valorAtual;
            break;
    }
    display.innerText = resultado;
    operador = null;
})

btnLimpar.addEventListener('click', ()=> {
    display.innerText = "0";
    valorAnterior = "";
    operador = null;
    aguardeNum = false;
})