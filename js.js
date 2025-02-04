const elementos = {
    fundoTela: document.querySelector('body'),
    btnLigarDesligar: document.querySelector('.toggle-input'),
    visorCalc: document.querySelector('.visor'),
    numeros: document.querySelectorAll('.numero'),
    numerozero: document.querySelector('.numero-0'),
    operadores: document.querySelectorAll('.operador'),
    botaoIgualdade: document.getElementById('botao-igualdade')
}

let variaveis = {
    valoresVisor: '',
    valoresSeparados: [],
    valorUltimaOperacao: '',
}

elementos.btnLigarDesligar.addEventListener('change', () => {
    if (elementos.btnLigarDesligar.checked) {
        elementos.fundoTela.style.backgroundColor = 'green';
        elementos.visorCalc.style.backgroundColor = '#999999';
        
        elementos.numeros.forEach(numero => {
            numero.style.pointerEvents = 'auto';
            numero.style.opacity = '1';
        })

        elementos.numerozero.style.pointerEvents = 'auto';
        elementos.numerozero.style.opacity = '1';

        elementos.operadores.forEach(operador => {
            operador.style.pointerEvents = 'auto';
            operador.style.opacity = '1';
        })

        elementos.botaoIgualdade.style.pointerEvents = 'auto'
        elementos.botaoIgualdade.style.opacity = '1'

        elementos.visorCalc.innerText = ""

    } else {
        elementos.fundoTela.style.backgroundColor = 'rgb(192, 67, 67)';
        elementos.visorCalc.style.backgroundColor = 'gray';

        elementos.numeros.forEach(numero => {
            numero.style.pointerEvents = 'none';
            numero.style.opacity = '0.7';
        })

        elementos.numerozero.style.pointerEvents = 'none';
        elementos.numerozero.style.opacity = '0.7';

        elementos.operadores.forEach(operador => {
            operador.style.pointerEvents = 'none';
            operador.style.opacity = '0.7';
        })

        elementos.botaoIgualdade.style.pointerEvents = 'none'
        elementos.botaoIgualdade.style.opacity = '0.7'

        elementos.visorCalc.innerText = "7 + 4 = 11"
    }
})


//Depois perguntar, porque não posso utilizar o readonly

//Perguntar depois se é melhor criar uma class desativo e ter a interação com classList.add('')


elementos.numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        let valorNumero = numero.getAttribute('data-numero')
        console.log(valorNumero)
        variaveis.valoresVisor += valorNumero      
        elementos.visorCalc.innerText = variaveis.valoresVisor;
    })
})

elementos.operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        let valorOperador = operador.getAttribute('data-operador');
        console.log(valorOperador)
        
        if(variaveis.valoresSeparados.length == 0 && variaveis.valorUltimaOperacao != 0) {
            variaveis.valoresVisor = variaveis.valorUltimaOperacao
        }
        
        variaveis.valoresVisor += valorOperador
        
        elementos.visorCalc.innerText = variaveis.valoresVisor;
    })
})

function operacao (num1, operador, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    let funcao = ''
    operador = operador.trim();
    
    if (operador == "+") {
        funcao = num1 + num2
    }else if(operador == "-") {
        funcao = num1 - num2
    }else if (operador == "x") {
        funcao = num1 * num2
    }else if (operador == "÷"){
        if (num1 == 0 || num2 == 0) {
            elementos.visorCalc.innerText = 'Erro: Divisão por 0'  
        } else {
            funcao = num1 / num2
        }
    }

    variaveis.valoresVisor += funcao
    elementos.visorCalc.innerText = variaveis.valoresVisor
    variaveis.valorUltimaOperacao = funcao

    variaveis.valoresSeparados.splice(0,4)
    console.log(variaveis.valoresSeparados)
}   

elementos.botaoIgualdade.addEventListener('click', () => {
    console.log('vai 2')
    variaveis.valoresSeparados = variaveis.valoresVisor.split(' ')
    console.log(variaveis.valoresSeparados)

    elementos.visorCalc.innerText = variaveis.valoresVisor += " = "

    operacao(variaveis.valoresSeparados[0], variaveis.valoresSeparados[1], variaveis.valoresSeparados[2]);
})