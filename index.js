let cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const msg = document.getElementById("msg");
const overlay = document.getElementById("overlay");
const msgContainer = document.querySelector(".msg-container");
const newBtn = document.getElementById("new-btn");
const resetBtn = document.getElementById("reset-btn");

let isActive = true; //player X starts first

// Define winning patterns for Tic Tac Toe
// Each pattern is an array of indices that represent the winning combinations
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Add event listeners to each cell for click events
// When a cell is clicked, it will toggle between "X" and "O"
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isActive) {
      cell.textContent = "X";
      isActive = false;
    } else {
      cell.textContent = "O";
      isActive = true;
    }
    cell.setAttribute("disabled", true);
    checkWinner();
  });
});

// Allow players to start a new game
// It also hides the message overlay
// and resets the game state
newBtn.addEventListener("click", () => {
  for (let cell of cells) {
    cell.textContent = "";
    cell.removeAttribute("disabled");
  }
  msg.textContent = "";
  overlay.style.display = "none";
  msgContainer.style.display = "none";
  isActive = true;
});

// Reset button to clear the game board
resetBtn.addEventListener("click", () => {
  for (let cell of cells) {
    cell.textContent = "";
    cell.removeAttribute("disabled");
  }
});

// Disable all cells when the game ends
function cellDisable() {
  for (let cell of cells) {
    cell.setAttribute("disabled", true);
  }
}

// Function to show the winner message
function showWinner(winner) {
  msg.textContent = `Player ${winner} wins!`;
  overlay.style.display = "block";
  msgContainer.style.display = "flex";
}

// Function to check for a winner
function checkWinner() {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      showWinner(cells[a].textContent);
      for (let cell of cells) {
        cell.setAttribute("disabled", true);
      }
      winnerFound = true;
      break;
    }
  }
  // Check for a draw condition
  if (!winnerFound && [...cells].every((cell) => cell.textContent)) {
    draw();
  }
}
// Function to handle a draw situation
function draw() {
  msg.textContent = `No winner! It's a draw!`;
  overlay.style.display = "block";
  msgContainer.style.display = "flex";
}
