const elementos = {
    fundoTela: document.querySelector('body'),
    btnLigarDesligar: document.querySelector('.toggle-input'),
    visorCalc: document.querySelector('.visor'),
    numeros: document.querySelectorAll('.numero'),
    numerozero: document.querySelector('.numero-0'),
    operadores: document.querySelectorAll('.operador'),
    botaoIgualdade: document.getElementById('botao-igualdade'),
    botaoApagar: document.getElementById('botao-apagar'),
    todosBotoes: document.querySelectorAll('button'),

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

        elementos.botaoApagar.style.pointerEvents= "auto"
        elementos.botaoApagar.style.opacity = "1"

        elementos.visorCalc.innerText = ""

        window.removeEventListener('keydown', teclaTeclado);
        window.addEventListener('keydown', teclaTeclado);

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

        elementos.botaoApagar.style.pointerEvents = '0.7'
        elementos.botaoApagar.style.opacity = '0.7'

        variaveis.valoresVisor = ''
        variaveis.valoresSeparados = []
        variaveis.valorUltimaOperacao = ''

        elementos.visorCalc.innerText = "Calculadora"

        window.removeEventListener('keydown', teclaTeclado);
    }
})


function teclaTeclado (evento) {
    tecla = evento.key
    teclaNumero = parseInt(evento.key)
    console.log(tecla)
    botaoEncontrado = null;

    if(!isNaN(teclaNumero)){
        botaoEncontrado = document.querySelector(`[data-numero="${tecla}"]`)
        botaoEncontrado.click();

    }else if (tecla == "Backspace") {
        elementos.botaoApagar.click();

    } else {
        if(tecla == '+') {
            tecla = ' + '
        }else if(tecla == '-') {
            tecla = ' - '
        } else if (tecla == '*') {
            tecla = ' x '
        } else if (tecla == '/') {
            tecla = ' ÷ '
        } else if (tecla == "Enter"){
            tecla = ' = '
        }
    
        botaoEncontrado = document.querySelector(`[data-operador="${tecla}"]`)
        botaoEncontrado.click();
    }
}

elementos.numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        let valorNumero = numero.getAttribute('data-numero')
        console.log(valorNumero)

        if(variaveis.valoresVisor == variaveis.valorUltimaOperacao) {
            variaveis.valoresVisor = '';
        }
        
        variaveis.valoresVisor += valorNumero

        elementos.visorCalc.innerText = variaveis.valoresVisor;
    })
})

elementos.operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        let valorOperador = operador.getAttribute('data-operador');
        console.log(valorOperador)
        
        if(variaveis.valoresVisor === '' && variaveis.valorUltimaOperacao != '') {
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
    variaveis.valoresVisor = ''

    variaveis.valoresSeparados.splice(0, 3)
    console.log(variaveis.valoresSeparados)
}   

elementos.botaoIgualdade.addEventListener('click', () => {
    variaveis.valoresSeparados = variaveis.valoresVisor.split(' ').filter(valor => valor !== '');
    console.log(variaveis.valoresSeparados)

    elementos.visorCalc.innerText = variaveis.valoresVisor += " = "

    operacao(variaveis.valoresSeparados[0], variaveis.valoresSeparados[1], variaveis.valoresSeparados[2]);

})

elementos.botaoApagar.addEventListener('click', () => {
    let visorNormalizado = variaveis.valoresVisor.trim(); 
    let ultimaOperacaoNormalizada = variaveis.valorUltimaOperacao.toString().trim();  

    if (visorNormalizado === ultimaOperacaoNormalizada) {
        variaveis.valoresVisor = "";
    } else if (variaveis.valoresVisor.slice(-1) == " ") {
        variaveis.valoresVisor = variaveis.valoresVisor.slice(0, -3);
    } else {
        variaveis.valoresVisor = variaveis.valoresVisor.slice(0, -1);
    }

    elementos.visorCalc.innerText = variaveis.valoresVisor
})

elementos.todosBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        botao.classList.add('hover')

    setTimeout(() => {
        botao.classList.remove('hover')
    }, 200)
    })
})