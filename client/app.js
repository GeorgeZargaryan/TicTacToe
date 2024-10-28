import { io } from 'socket.io-client';
var canvas = document.getElementById("canvas");

const socket = io("http://localhost:3000");
let blocks = [];

const players = ["X", "O"];
const gameState = document.getElementById("gameState");
const announcement = document.getElementById("announcement");
const restartButton = document.getElementById("restartBtn");
const stats = document.getElementById("statsTable");
let currPlayer = players[0];
let gameEnded = false;

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("send-message", (message) => {
    console.log(message);
});

socket.on('receive-click', (obj) => {
    click(obj.block);
});

//TODO: After page reload save game state...
socket.on('restart-game', () => {
    restartGame();
});

restartButton.addEventListener("click", (e) => {
    socket.emit('restart-click');
    restartGame();
});


const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

function statsInit(statsObj) {
    statsObj.forEach(element => {
        stats.append(document.createElement("h2").textContent(`${element.key}:${element.value}`))
    });
}

function click(id) {
    let block = blocks[id - 1];

    if (block.textContent !== '' || gameEnded == true) {
        return;
    }

    block.textContent = currPlayer;

    socket.emit("block-click", { block: block.id.slice(-1), turn: currPlayer });

    block.classList.add("Active" + currPlayer);

    if (checkWin(currPlayer)) {
        announcement.parentNode.style.display = 'block';
        socket.emit("update-statistics", currPlayer);
        announcement.textContent = `Game end: ` + currPlayer + ` wins!!!`;
        gameEnded = true;
        return;
    }
    if (checkTie()) {
        announcement.parentNode.style.display = 'block';
        announcement.textContent = `Game is tied!!!`;
        gameEnded = true;
        return;
    }

    currPlayer = (currPlayer === players[0]) ? players[1] : players[0];

    if (currPlayer == players[0]) {
        gameState.textContent = `X's turn`;
    } else {
        gameState.textContent = `O's turn`;
    }
}

function startGame() {
    initializeCanvas();
}

function initializeCanvas() {
    gameState.textContent = `X's turn`;
    fillCanvas();
}

function restartGame() {
    announcement.parentNode.style.display = 'none';
    gameEnded = false;
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].textContent = "";
        blocks[i].classList.remove("ActiveX", "ActiveO");
    }
    gameState.textContent = `X's turn!`;
    currPlayer = players[0];
}

function fillCanvas() {
    console.log(blocks.length);
    canvas.innerHTML = ' ';
    for (let i = 1; i < 10; i++) {
        let block = document.createElement("div");

        block.classList.add("block");
        block.id = "block-" + i;
        block.addEventListener("click", (e) => click(e.target.id.slice(-1)));
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
