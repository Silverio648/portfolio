
const calcular = document.getElementById('calcular');


function imc() {
    const nome = document.getElementById('nome').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    if (nome.value !== '' && altura !== '' && peso !=='') {

        const valorIMC = (peso / (altura * altura)).toFixed(2);

        let classificacao = '';

        if (valorIMC < 18.5){
            classificacao = 'Abaixo do peso.'
        }else if (valorIMC < 25) {
            classificacao = 'Você está com o peso ideal. Parabéns!!!';
        }else if (valorIMC < 30) {
            classificacao = 'Você está levemente acima do peso. Atenção!!!';
        }else if (valorIMC < 35) {
            classificacao = 'Você está com Obesidade grau I!!!';
        }else if (valorIMC < 40) {
            classificacao = 'Você está com Obesidade grau II!!!';
        }else {
            classificacao = 'Você está com Obesidade Mórbida. Perigo!!!';
        }

        resultado.textContent = `${nome} seu IMC é ${valorIMC} e você está ${classificacao}`;

    }else {
        resultado.textContent = 'Preencha todos os campos!!!';
    }

}
calcular.addEventListener('click', imc);