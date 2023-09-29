const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.querySelector('.score'); // Referência ao elemento de exibição da pontuação
let score = 0; // Variável de pontuação inicializada com 0

const jump = () => {

    mario.classList.add('jump');
   
    setTimeout(() => {

        mario.classList.remove('jump');
    }, 500);
}

const updateScore = () => {
    // Incrementar a pontuação
    score++;
    // Atualizar o elemento de exibição da pontuação
    scoreDisplay.textContent = score;
}

const loop = setInterval(()=> {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);
    
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './image/game-over.png';
        mario.style.width ='80px'
        mario.style.marginLeft = '50px'

        clearInterval(loop);

    } else if (pipePosition < 0) {
        // Se o cano passar completamente pelo Mario, atualize a pontuação
        updateScore(); }


}, 10);

document.addEventListener('keydown', jump);

const backgroundMusic = document.getElementById('background-music');

// Iniciar a reprodução automaticamente quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(error => {
        // A reprodução automática pode ser bloqueada, trate o erro aqui
        console.error('Erro ao reproduzir áudio automaticamente:', error);
    });
});
const audioControlButton = document.getElementById('audio-control-button');

// Adicione um ouvinte de evento para o botão de controle
audioControlButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
});

// Obtém a pontuação atual
const userScore = score; // Assumindo que você já tem uma variável 'score' que representa a pontuação

// Obtém o nome do usuário do campo de entrada
const username = document.getElementById('username').value;

// Verifica se o nome de usuário não está vazio
if (username.trim() !== '') {
    // Obtém os dados existentes do Local Storage ou cria um array vazio
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Adiciona o novo registro de pontuação
    highScores.push({ username, score: userScore });

    // Classifica a lista de pontuações em ordem decrescente
    highScores.sort((a, b) => b.score - a.score);

    // Mantém apenas as 10 melhores pontuações
    highScores.splice(10);

    // Salva a lista atualizada no Local Storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Obtém as pontuações do Local Storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Acesse o elemento onde você deseja exibir as pontuações (por exemplo, uma <ul>)
const highScoresList = document.getElementById('high-scores-list');

// Limpe qualquer conteúdo existente na lista (caso deseje atualizar as pontuações)
highScoresList.innerHTML = '';

// Itera pelas pontuações e cria elementos para exibi-las
highScores.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${entry.username}: ${entry.score}`;
    highScoresList.appendChild(li);
});