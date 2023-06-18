let targetX, targetY;
let playerX = 10,
  playerY = 10,
  playerBody = [];
let velocityX = 0,
  velocityY = 0;

function targetPositionGenerator() {
  targetX = Math.floor(Math.random() * 30) + 1;
  targetY = Math.floor(Math.random() * 30) + 1;
}

function playerMovement(e) {
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
    // playerX = 30;
    playerBody[0] = [30, playerY];
  } else if (playerBody[0][0] > 30) {
    // playerX = 1;
    playerBody[0] = [1, playerY];
  } else if (playerBody[0][1] < 1) {
    // playerY = 30;
    playerBody[0] = [playerX, 30];
  } else if (playerBody[0][1] > 30) {
    // playerY = 1;
    playerBody[0] = [playerX, 1];
  }
}
function pause() {
  clearInterval();
}

function gameOver() {
  const gameOverPanel = document.getElementById("game-over-panel");
  const restartButton = document.getElementById("restart-button");
  clearInterval(sequence);
  gameOverPanel.style.display = "block";
  restartButton.addEventListener("click", restartGame);
  //   clearInterval(intervalId);
}

function restartGame() {
  const gameOverPanel = document.getElementById("game-over-panel");
  gameOverPanel.style.display = "none";
  //   clearInterval(sequence);
  location.reload();
}
function initGame() {
  const boardGrid = document.querySelector(".board");
  let htmlMarkup;
  htmlMarkup = `<div class ="target" style="grid-area: ${targetY}/ ${targetX}"></div>`;

  if (playerX === targetX && playerY === targetY) {
    targetPositionGenerator();
    playerBody.push([targetX, targetY]);
  }
  //   borderCollision(); // check if player head hit the border
  // shifting player body value
  for (let i = playerBody.length - 1; i > 0; i--) {
    playerBody[i] = playerBody[i - 1];
  }
  //   console.log("shifting body", playerBody);
  playerBody[0] = [playerX, playerY]; // player head is current position
  playerX += velocityX;
  playerY += velocityY;

  borderCollision(); // check if player head hit the border

  //   playerBody[x][1] = column
  //   playerBody[x][0] = row
  for (let i = 0; i < playerBody.length; i++) {
    htmlMarkup += `<div class ="player" style="grid-area: ${playerBody[i][1]}/ ${playerBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      playerBody[0][1] === playerBody[i][1] &&
      playerBody[0][0] === playerBody[i][0]
    ) {
      console.log("GAME OVER");
      console.log("this is head", playerBody[0][0], playerBody[0][1]);
      console.log("this is body", playerBody[i][0], playerBody[i][1]);
      console.log("this is whole body", playerBody);
      gameOver();
    }
  }
  boardGrid.innerHTML = htmlMarkup;
}

targetPositionGenerator();
let sequence = setInterval(initGame, 250); // method calls a function at specifed intervals (ms).

// the first parameter is event which can be found on the internet.
// the second parameter is function name.
document.addEventListener("keydown", playerMovement);
