let currentPlayer = Math.random() < 0.5 ? 1 : 2;
let messageDiv = document.createElement("div");
document.querySelector(".dice-div").appendChild(messageDiv);

// 🎵 Sound setup
const diceSound = new Audio("diceSound.mp3");
const ladderSound = new Audio("ladderSound.mp3");
const snakeSound = new Audio("snakeSound.mp3");

let playerOneDiv = document.createElement("div");
playerOneDiv.style.height = "10px";
playerOneDiv.style.width = "10px";
playerOneDiv.style.backgroundColor = "red";
let playerOneCount = 0;
let playerOneStarted = false;

let playerTwoDiv = document.createElement("div");
playerTwoDiv.style.height = "10px";
playerTwoDiv.style.width = "10px";
playerTwoDiv.style.backgroundColor = "blue";
let playerTwoCount = 0;
let playerTwoStarted = false;

function updateMessage(msg) {
  messageDiv.textContent = msg;
}

function rollDice() {
  const dice = document.getElementById("dice");
  dice.classList.add("dice-roll");
  const diceNumber = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice${diceNumber}.svg`;

  // 🔊 Play dice roll sound
  diceSound.play();

  setTimeout(() => {
    dice.classList.remove("dice-roll");
  }, 100);

  return diceNumber;
}

function applySnakesAndLadders(position, player) {
  const transitions = {
    4: 25,
    21: 39,
    29: 74,
    43: 76,
    63: 80,
    71: 89,
    30: 7,
    47: 15,
    56: 19,
    82: 42,
    98: 55,
    92: 75,
    73: 51,
    
  };

  if (transitions[position]) {
    const newPosition = transitions[position];

    if (newPosition > position) {
      ladderSound.play();
      updateMessage(`Player ${player} found a ladder to ${newPosition}!`);
    } else {
      snakeSound.play();
      updateMessage(`Oh no! Player ${player} got bitten by a snake down to ${newPosition}.`);
    }

    return newPosition;
  }

  return position;
}

function playerOneRoll() {
  if (currentPlayer !== 1) return;

  let roll = rollDice();
  updateMessage(`Player 1 rolled a ${roll}`);

  if (!playerOneStarted) {
    if (roll === 1) {
      playerOneStarted = true;
      playerOneCount = 1;
      let title = document.querySelector(`.title${playerOneCount}`);
      title.appendChild(playerOneDiv);
      updateMessage("Player 1 enters the game with a 1! Roll again.");
    } else {
      currentPlayer = 2;
      updateMessage("Player 1 needs a 1 to start. Player 2's turn.");
    }
    return;
  }

  if (playerOneCount + roll <= 100) {
    playerOneCount += roll;
  }

  playerOneCount = applySnakesAndLadders(playerOneCount, 1);

  let title = document.querySelector(`.title${playerOneCount}`);
  title.appendChild(playerOneDiv);

  if (roll === 6) {
    updateMessage("Player 1 got a 6! Roll again.");
    return;
  }

  currentPlayer = 2;
  updateMessage("Player 2's turn.");
}

function playerTwoRoll() {
  if (currentPlayer !== 2) return;

  let roll = rollDice();
  updateMessage(`Player 2 rolled a ${roll}`);

  if (!playerTwoStarted) {
    if (roll === 1) {
      playerTwoStarted = true;
      playerTwoCount = 1;
      let title = document.querySelector(`.title${playerTwoCount}`);
      title.appendChild(playerTwoDiv);
      updateMessage("Player 2 enters the game with a 1! Roll again.");
    } else {
      currentPlayer = 1;
      updateMessage("Player 2 needs a 1 to start. Player 1's turn.");
    }
    return;
  }

  if (playerTwoCount + roll <= 100) {
    playerTwoCount += roll;
  }

  playerTwoCount = applySnakesAndLadders(playerTwoCount, 2);

  let title = document.querySelector(`.title${playerTwoCount}`);
  title.appendChild(playerTwoDiv);

  if (roll === 6) {
    updateMessage("Player 2 got a 6! Roll again.");
    return;
  }

  currentPlayer = 1;
  updateMessage("Player 1's turn.");
}

// Initial game message
updateMessage(
  `Game started. Player ${currentPlayer}'s turn. Roll a 1 to enter.`
);
