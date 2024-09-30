var canvas = document.getElementById("canvas");
const players = ["X", "O"];
const gameState = document.getElementById("gameState");
const restartButton = document.getElementById("restartBtn");

restartButton.addEventListener("click", (e) => {
    restartGame();
});

let blocks = [];

let currPlayer = players[0];
let gameEnded = false;

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function startGame() {
    initializeCanvas();
}

function initializeCanvas() {
    gameState.textContent = `X's turn`;
    
    fillCanvas();
}

function restartGame() {
    gameEnded = false;
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = ""
        blocks[i].classList.remove("ActiveX", "ActiveO");
    }
    gameState.textContent = `X's turn!`;
    currPlayer = players[0]
}

function fillCanvas() {
    console.log(blocks.length);
    canvas.innerHTML = ' ';
    for (let i = 1; i < 10; i++) {
        let block = document.createElement("div");

        block.classList.add("block");
        block.id = "block-" + i;
        block.addEventListener("click", (e) => {
            if (e.target.textContent !== '' || gameEnded == true) {
                return;
            }
            e.target.textContent = currPlayer;
            e.target.classList.add("Active" + currPlayer);
            if (checkWin(currPlayer)) {
                gameState.textContent = `Game end: ` + currPlayer + ` wins!!!`;
                gameEnded = true;
                return;
            }
            if (checkTie()) {
                gameState.textContent = `Game is tied!!!`;
                return;
            }

            currPlayer = (currPlayer === players[0]) ? players[1] : players[0];

            if (currPlayer == players[0]) {
                gameState.textContent = `X's turn`;
            } else {
                gameState.textContent = `O's turn`;
            }
        });

        blocks.push(block);
    }
    canvas.append(...blocks);

}

function checkWin(currPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i]
        if (blocks[a].textContent === currPlayer && blocks[b].textContent === currPlayer && blocks[c].textContent === currPlayer) {
            return true
        }
    }
    return false

}

function checkTie() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].textContent === '') {
            return false;
        }
    }
    return true;
}



initializeCanvas(canvas);

console.log(canvas);
