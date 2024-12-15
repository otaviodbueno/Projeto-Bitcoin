const valorMedioInput = document.querySelector("#preco-medio")
const valorAtualInput = document.querySelector("#preco-atual")
const valorCompradoInput = document.querySelector("#valor-comprado")
const btnCalcular = document.querySelector("#btn-btc-calc")
const divsPrincipais = document.querySelectorAll(".container")
const btnVoltar = document.querySelector("#btn-voltar")

const inputs = document.querySelectorAll(".inputs")

const retornoReais = document.querySelector("#reais")
const retornoPorcentagem = document.querySelector("#porcentagem")
const errorMessageDiv = document.querySelector(".error-message")

// funçao

function showErrorMessage(inputs, errorMessageDiv) {

    if(errorMessageDiv.classList.contains("active")) {
        return null;
    }

    let erro = false

    for(let input of inputs){
        if(input.value.trim() === "") {

           alternarDivs([errorMessageDiv]) 

           setTimeout(() => {
            alternarDivs([errorMessageDiv])
           }, 1200)

           erro = true

           break;
        }
    }

    return erro;
}

function alternarDivs(divs) {
    divs.forEach((container) => {
        container.classList.toggle("active")
        container.classList.toggle("hidden")
    })
}

const calculaGanhoOuPerdaPorcentagem = (valorMedio, valorAtual) => {

    let porcentagem;

    if(valorMedio < valorAtual) {
         porcentagem = ((valorAtual - valorMedio) / valorMedio) * 100
    } else {
          porcentagem = ((valorMedio - valorAtual) / valorMedio) * 100
    }
    return porcentagem
}


const calculaGanhoOuPerdaReais = (valorComprado, valorMedio, valorAtual) => {

    let ganhoReais;

    let valorizacao = calculaGanhoOuPerdaPorcentagem(valorMedio, valorAtual)

    ganhoReais = (valorComprado * valorizacao / 100);

     return ganhoReais;
}


const verificaGanho = (valorMedio, valorAtual) => {

    if(valorMedio === valorAtual) return null; 

    if(valorMedio < valorAtual) {
        return true
    } else {
        return false 
    }
}

// eventos 

btnCalcular.addEventListener("click", (e) => {
    e.preventDefault()

    const erro = showErrorMessage(inputs, errorMessageDiv)

    if(erro || erro === null) {
        return;
    }

    const valorMedio = parseFloat(valorMedioInput.value);
    const valorAtual = parseFloat(valorAtualInput.value);
    const valorComprado = parseFloat(valorCompradoInput.value);

    const resultadoPerdaOuGanho = calculaGanhoOuPerdaPorcentagem(valorMedio, valorAtual)

    const resultadoPorcentagem = parseFloat(resultadoPerdaOuGanho.toFixed(2))

    const reaisPerdidosOuGanhados = calculaGanhoOuPerdaReais(valorComprado, valorMedio, valorAtual)

    const reais = parseFloat(reaisPerdidosOuGanhados.toFixed(2))

    const ganhoOuPerda = verificaGanho(valorMedio, valorAtual)

    switch(ganhoOuPerda) {
        case null:
            retornoReais.textContent = "Você não ganhou nem perdeu nada. Por enquanto..."
            retornoPorcentagem.textContent = "Seu dinheiro não valorizou ainda, quem sabe no futuro..."
            break;
        case true:
            // console.log(`Você está com um lucro de R$${reaisTratado}, parabéns!`)
            retornoReais.textContent = `Lucro de R$${reais}, parabéns!`
            retornoPorcentagem.textContent = `Este lucro entrega uma valorização de ${resultadoPorcentagem}%`
            break;
        case false: 
            retornoReais.textContent = `Você perdeu R$${reais}, que pena!`
            retornoPorcentagem.textContent = `Seu dinheiro desvalorizou ${resultadoPorcentagem}%...`
            //console.log(`Você perdeu R$${reaisTratado}, que pena!`)
    }

    alternarDivs(divsPrincipais);

})

btnVoltar.addEventListener("click", (e) => {
    e.preventDefault()

    alternarDivs(divsPrincipais);
})
