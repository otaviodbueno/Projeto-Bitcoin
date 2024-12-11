const valorMedioInput = document.querySelector("#preco-medio")
const valorAtualInput = document.querySelector("#preco-atual")
const valorCompradoInput = document.querySelector("#valor-comprado")
const btnCalcular = document.querySelector("#btn-btc-calc")
const divsPrincipais = document.querySelectorAll(".container")
const btnVoltar = document.querySelector(".btn-voltar")

// teste
testeInput = document.querySelector("#teste")

// funçao

function alternarDivs(divs) {
    divsPrincipais.forEach((container) => {
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

    const valorMedio = parseFloat(valorMedioInput.value);
    const valorAtual = parseFloat(valorAtualInput.value);
    const valorComprado = parseFloat(valorCompradoInput.value);

    const resultado = calculaGanhoOuPerdaPorcentagem(valorMedio, valorAtual)

    const resultadoTratado = parseFloat(resultado.toFixed(2))

    const ganho = verificaGanho(valorMedio, valorAtual)

    switch(ganho) {
       case true:
        console.log(`Você obteve uma valorização de ${resultadoTratado}%`)
        break;
       case false: 
       console.log(`Você obteve uma desvalorização de ${resultadoTratado}%`)
    }

    const reais = calculaGanhoOuPerdaReais(valorComprado, valorMedio, valorAtual)

    const reaisTratado = parseFloat(reais.toFixed(2))

    const ganhoOuPerda = verificaGanho(valorMedio, valorAtual)

    switch(ganhoOuPerda) {
        case null:
            console.log(`Você não ganhou ou perdeu nada!`)
            break;
        case true:
            // console.log(`Você está com um lucro de R$${reaisTratado}, parabéns!`)
            testeInput.textContent = `Lucro de R$${reaisTratado}, parabéns!`
            break;
        case false: 
            console.log(`Você perdeu R$${reaisTratado}, que pena!`)
    }

    alternarDivs(divsPrincipais);

})

btnVoltar.addEventListener("click", (e) => {
    e.preventDefault()

    alternarDivs(divsPrincipais);
})
