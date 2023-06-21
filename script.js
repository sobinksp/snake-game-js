let targetX, targetY;
let playerX = 10,
  playerY = 10,
  playerBody = [];
let velocityX = 0,
  velocityY = 0;
let pauseState = false;
let intervalTime = 350;
let gameOverState = false;
const pauseOverPanel = document.querySelector(".pause-over-panel");
const restartButton = document.getElementById("restart-button");
const panelHeader = document.querySelector(".pause-over-panel h1");

function targetPositionGenerator() {
  targetX = Math.floor(Math.random() * 30) + 1;
  targetY = Math.floor(Math.random() * 30) + 1;
}

function playerMovement(e) {
  if (pauseState) {
    return;
  }
  if (gameOverState) {
    return;
  }
  if (e.key === "w") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "a") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "s") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "d") {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
  //   console.log(e.key);
  //   console.log(playerX, playerY);
}

function borderCollision() {
  if (playerBody[0][0] < 1) {
    playerX = 30;
    playerBody[0] = [playerX, playerY];
  } else if (playerBody[0][0] > 30) {
    playerX = 1;
    playerBody[0] = [playerX, playerY];
  } else if (playerBody[0][1] < 1) {
    playerY = 30;
    playerBody[0] = [playerX, playerY];
  } else if (playerBody[0][1] > 30) {
    playerY = 1;
    playerBody[0] = [playerX, playerY];
  }
}

function togglePauseGame() {
  pauseState = !pauseState;
  if (pauseState) {
    clearInterval(sequence);
    panelHeader.textContent = "PAUSE";
    pauseOverPanel.style.display = "block";
    restartButton.addEventListener("click", restartGame);
  } else {
    pauseOverPanel.style.display = "none";
    sequence = setInterval(initGame, intervalTime);
  }
}

function gameOver() {
  clearInterval(sequence);
  panelHeader.textContent = "GAME OVER";
  pauseOverPanel.style.display = "block";
  restartButton.addEventListener("click", restartGame);
}

function restartGame() {
  pauseOverPanel.style.display = "none";
  location.reload();
}

function eatFood() {
  if (playerX === targetX && playerY === targetY) {
    targetPositionGenerator();
    playerBody.push([targetX, targetY]);
  }
}
function initGame() {
  const boardGrid = document.querySelector(".board");
  let htmlMarkup;
  htmlMarkup = `<div class ="target" style="grid-area: ${targetY}/ ${targetX}"></div>`;
  eatFood();
  // shifting player body value
  for (let i = playerBody.length - 1; i > 0; i--) {
    playerBody[i] = playerBody[i - 1];
  }
  playerBody[0] = [playerX, playerY]; // player head is current position
  borderCollision(); // check if player head hit the border
  eatFood();

  playerX += velocityX;
  playerY += velocityY;

  // playerBody[i][1] = row
  // playerBody[i][0] = column
  for (let i = 0; i < playerBody.length; i++) {
    htmlMarkup += `<div class ="player" style="grid-area: ${playerBody[i][1]}/ ${playerBody[i][0]}"></div>`;
    // if player's head hit player's body, the game is over.
    if (
      i !== 0 &&
      playerBody[0][1] === playerBody[i][1] &&
      playerBody[0][0] === playerBody[i][0]
    ) {
      gameOverState = true;
      console.log(gameOverState);
      gameOver();
    }
  }
  boardGrid.innerHTML = htmlMarkup;
}
targetPositionGenerator();
let sequence = setInterval(initGame, intervalTime); // method calls a function at specifed intervals (ms).

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && gameOverState === false) {
    togglePauseGame();
  }
});
document.addEventListener("keydown", playerMovement);
