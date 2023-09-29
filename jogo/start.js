// start-screen.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const usernameInput = document.getElementById('username');
    const highScoreDisplay = document.getElementById('high-score');

    // Verifique se há uma pontuação mais alta armazenada e exiba-a
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
        highScoreDisplay.textContent = storedHighScore;
    }

    // Adicione um ouvinte de evento para iniciar o jogo
    startButton.addEventListener('click', () => {
        const username = usernameInput.value.trim(); // Obtenha o nome de usuário
        if (username === '') {
            alert('Digite seu nome de usuário antes de iniciar o jogo.');
        } else {
            // Salve o nome de usuário no armazenamento local
            localStorage.setItem('username', username);
            // Redirecione para a página do jogo
            window.location.href = 'game.html';
        }
    });
});

// Após o jogo terminar (colisão com um obstáculo)
const finalScore = score; // Obtenha a pontuação atual
const username = localStorage.getItem('username'); // Obtenha o nome de usuário
if (username) {
    // Verifique se há uma pontuação mais alta anteriormente salva
    const storedHighScore = localStorage.getItem('highScore');
    if (!storedHighScore || finalScore > parseInt(storedHighScore)) {
        // Se não há pontuação anterior ou a nova pontuação é maior
        localStorage.setItem('highScore', finalScore.toString()); // Salve a nova pontuação mais alta
    }
}