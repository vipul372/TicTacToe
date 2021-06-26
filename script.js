const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const boardElement = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winning-message");
const restartButton = document.getElementById("restart-button");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);



function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  cell.classList.add(currentClass); //placeMark
  if (checkForWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    circleTurn = !circleTurn; //switch turn and set
    setBoardHoverClass(); 
  }
}

function setBoardHoverClass() {
  boardElement.classList.remove(X_CLASS);
  boardElement.classList.remove(CIRCLE_CLASS);
  circleTurn
    ? boardElement.classList.add(CIRCLE_CLASS)
    : boardElement.classList.add(X_CLASS);
}

function checkForWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}
