const elementos = {
    fundoTela: document.querySelector('body'),
    btnLigarDesligar: document.querySelector('.toggle-input'),
    visorCalc: document.querySelector('.visor'),

}

elementos.btnLigarDesligar.addEventListener('change', () => {
    if (elementos.btnLigarDesligar.checked) {
        elementos.fundoTela.style.backgroundColor = 'green';
        elementos.visorCalc.style.backgroundColor = '#999999';
    } else {
        elementos.fundoTela.style.backgroundColor = 'rgb(192, 67, 67)';
        elementos.visorCalc.style.backgroundColor = 'gray';
    }
})