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
    }
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        square.classList.add('square');
        square.addEventListener('click', () => {
            if (gameState[i] === null) {
                if (currentPlayer === 'X') {
                    gameState[i] = 'X';
                    square.textContent = 'X';
                    square.classList.add('X');
                } else {
                    gameState[i] = 'O';
                    square.textContent = 'O';
                    square.classList.add('O');
                }
                if (!checkWinner()) {
                    if (currentPlayer === 'X') {
                        currentPlayer = 'O';
                    } else {
                        currentPlayer = 'X';
                    }
                }
            } else {
                if (gameState[i] === 'X' || gameState[i] === 'O') {
                    return;
                }
            }
        });
        square.addEventListener('mouseenter', () => {
            if (!square.classList.contains('hover')) {
                square.classList.add('hover');
            }
        });
        square.addEventListener('mouseleave', () => {
            if (square.classList.contains('hover')) {
                square.classList.remove('hover');
            }
        });
    }
});