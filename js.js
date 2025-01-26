const elementos = {
    fundoTela: document.querySelector('body'),
    btnLigarDesligar: document.querySelector('.toggle-input'),
    visorCalc: document.querySelector('.visor'),
    numeros: document.querySelectorAll('.numero'),
    numerozero: document.querySelector('.numero-0'),
    operadores: document.querySelectorAll('.operador'),

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
    }
})


//Depois perguntar, porque não posso utilizar o readonly

//Perguntar depois se é melhor criar uma class desativo e ter a interação com classList.add('')


elementos.numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        let valorNumero = numero.getAttribute('data-numero')
        console.log(valorNumero)
    })
})