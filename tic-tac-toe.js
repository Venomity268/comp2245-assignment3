document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    let currentPlayer = 'X';
    const gameState = Array(9).fill(null);
    const statusDiv = document.getElementById('status');

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                statusDiv.textContent = `Congratulations! ${gameState[a]} is the Winner!`;
                statusDiv.classList.add('you-won');
                return true;
            }
        }
        return false;
    };
    const resetGame = () => {
        console.log("Reset game triggered");
        gameState.fill(null);
        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X', 'O');
        });
        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDiv.classList.remove('you-won');
        currentPlayer = 'X';
    };
    const newGameButton = document.querySelector('.btn');
    if (newGameButton) {
        newGameButton.addEventListener('click', resetGame);
    } else {
        console.error("New Game button with class 'btn' not found");
    }
    squares.forEach((square, index) => {
        square.classList.add('square');
        square.addEventListener('click', () => {
            if (!gameState[index]) {
                gameState[index] = currentPlayer;
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);
                if (!checkWinner()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
        square.addEventListener('mouseenter', () => {
            square.classList.add('hover');
        });
        square.addEventListener('mouseleave', () => {
            square.classList.remove('hover');
        });
    });
});