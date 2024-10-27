document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    let currentPlayer = 'X';
    const gameState = Array(9).fill(null);
    squares.forEach((square, index) => {
        square.classList.add('square');
        square.addEventListener('click', () => {
            if (!gameState[index]) {
                gameState[index] = currentPlayer;
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });
});