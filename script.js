let targetX, targetY;
let playerX = 10,
  playerY = 10;
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
  playerX += velocityX;
  playerY += velocityY;
  htmlMarkup += `<div class ="player" style="grid-area: ${playerY}/ ${playerX}"></div>`;
  boardGrid.innerHTML = htmlMarkup;
}

targetPositionGenerator();
initGame();

// the first parameter is event which can be found on the internet.
// the second parameter is function name.
document.addEventListener("keydown", playerMovement);
