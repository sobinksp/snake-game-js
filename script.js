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
// const boardGrid = document.querySelector(".board");
function initGame() {
  const boardGrid = document.querySelector(".board");
  let htmlMarkup;
  htmlMarkup = `<div class ="target" style="grid-area: ${targetY}/ ${targetX}"></div>`;
  if (playerX === targetX && playerY === targetY) {
    targetPositionGenerator();
    playerBody.push([targetX, targetY]);
    // console.log("after eat", playerBody);
  }
  // shifting player body value
  for (let i = playerBody.length - 1; i > 0; i--) {
    playerBody[i] = playerBody[i - 1];
    // console.log("shifting values", playerBody);
  }

  // player head = current position
  playerBody[0] = [playerX, playerY];
  playerX += velocityX;
  playerY += velocityY;
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
  //   console.log(playerBody);
  for (let i = 0; i < playerBody.length; i++) {
    // console.log(playerBody);
    htmlMarkup += `<div class ="player" style="grid-area: ${playerBody[i][1]}/ ${playerBody[i][0]}"></div>`;
    // console.log(htmlMarkup);
    // htmlMarkup += `<div class ="player" style="grid-area: ${playerY}/ ${playerX}"></div>`;
  }
  boardGrid.innerHTML = htmlMarkup;
}

targetPositionGenerator();
// initGame();
setInterval(initGame, 150);

// the first parameter is event which can be found on the internet.
// the second parameter is function name.
document.addEventListener("keydown", playerMovement);
