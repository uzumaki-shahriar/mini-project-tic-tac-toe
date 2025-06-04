let cell_buttons = document.querySelectorAll('.cell');
let reset_button = document.querySelector('#reset-btn');
let status_text = document.querySelector('#status-text');

let turnO = true;
let gameOver = false;
status_text.textContent = `Player ${turnO ? 'O' : 'X'}'s turn`

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cell_buttons.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '') {
            cell.textContent = turnO ? 'O' : 'X';
            checkWinner();
            if (!gameOver) {
                turnO = !turnO;
                status_text.textContent = `Player ${turnO ? 'O' : 'X'}'s turn`;
            }

            
        }

    });
})

const checkWinner = () => {
    for (let combination of winningCombinations) {
        let pos1Value = cell_buttons[combination[0]].textContent;
        let pos2Value = cell_buttons[combination[1]].textContent;
        let pos3Value = cell_buttons[combination[2]].textContent;
        if (pos1Value !== '' && pos1Value === pos2Value && pos1Value === pos3Value) {
            status_text.textContent = `Player ${pos1Value} wins!`;
            gameOver = true;
            cell_buttons.forEach((cell) => {
                cell.disabled = true;
            });
            combination.forEach(idx => cell_buttons[idx].classList.add('winner'));
            return;
        }
    }
    if ([...cell_buttons].every(cell => cell.textContent !== '')) {
        status_text.textContent = "It's a draw!";
        gameOver = true;
        return;
    }
}

reset_button.addEventListener('click', () => {
    cell_buttons.forEach((cell) => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('winner');
    });
    turnO = !turnO;
    gameOver = false;
    status_text.textContent = `Player ${turnO ? 'O' : 'X'}'s turn`;
});