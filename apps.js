const statusDisplay = document.querySelector('.status');
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
 document.querySelector('.reset').addEventListener('click', handleRestartGame);


let gameActive = true;
let currentPlayer = "X";
let gameState = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];


const winningMessage = () =>  ` ${currentPlayer} WINS!`;
const tieMessage = () => `It's a Tie!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
 }


statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
 
 
function handleCellPlayed(clickedCell, clickedCellIndex) {
   gameState[clickedCellIndex] = currentPlayer;
   clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
   currentPlayer = currentPlayer === "X" ? "O" : "X";
   statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
   let roundWon = false;
   for (let i = 0; i <= 7; i++) {
       const winCondition = winningConditions[i];
       const a = gameState[winCondition[0]];
       const b = gameState[winCondition[1]];
       const c = gameState[winCondition[2]];
       if (a === '' || b === '' || c === '') {
           continue;
       }
       if (a === b && b === c) {
           roundWon = true;
           break
       }
   }


   if (roundWon) {
       statusDisplay.innerHTML = winningMessage();
       gameActive = true;
       statusDisplay.style.color = "rgb(20,93,145)";
       return;
   }


   let roundTie = !gameState.includes("");
   if (roundTie) {
       statusDisplay.innerHTML = tieMessage();
       gameActive = false;
       statusDisplay.style.color = "rgb(13, 80, 129)";
       return;
   }


   handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
   const clickedCell = clickedCellEvent.target;
   const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

   if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
}

   handleCellPlayed(clickedCell, clickedCellIndex);
   handleResultValidation();
}
