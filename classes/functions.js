// function createCanvas(canvas) {
//     var blocks = [];

//     for (let i = 1; i < 10; i++) {
//         let block = document.createElement("div");

//         block.classList.add("block");
//         block.id = "block-" + i;
//         block.addEventListener("click", (e) =>
//         {
//             if(e.textContent !== '')
//             {
//                 return;
//             }
//             e.textContent = currPlayer;
//             if(checkWin(currPlayer))
//             {
//                 gameState.textContent = "Game end: " + currPlayer+ " wins!!!";
//                 return;
//             }
//             if(checkTie())
//             {
//                 gameState.textContent = "Game end, Tie!!!";
//                 return;
//             }
            
//             currPlayer = (currPlayer === players[0]) ? players[1] : players[0];

//             if(currPlayer == players[0])
//             {
//                 gameState.textContent = "X's turn";
//             } else 
//             {
//                 gameState.textContent = "O's turn";
//             }
//         })
//         blocks.push(block);
//     }

//     canvas.append(...blocks);
// }


// function checkWin(currPlayer)
// {

// }

// function checkTie()
// {

// }

// function getCurrTurn()
// {
//     return "X";
// }