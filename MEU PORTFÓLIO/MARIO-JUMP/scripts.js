const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
 
    console.log('loop'); 

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { // Comando que aciona a Condição de Game-Over

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '65px';
        mario.style.marginLeft = '50px';

        clearInterval(loop); // Comando pra zerar o Loop após o Game-Over

    };

}, 10);

document.addEventListener('keydown', jump); // Comando de pulo do mario ao pressionar qualquer tecla