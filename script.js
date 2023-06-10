let targetX, targetY;
let playerX = 10,
  playerY = 10;
function targetPositionGenerator() {
  targetX = Math.floor(Math.random() * 30) + 1;
  targetY = Math.floor(Math.random() * 30) + 1;
}

// const boardGrid = document.querySelector(".board");
function initGame() {
  const boardGrid = document.querySelector(".board");
  let htmlMarkup;
  htmlMarkup = `<div class ="target" style="grid-area: ${targetY}/ ${targetX}"></div>`;
  htmlMarkup += `<div class ="player" style="grid-area: ${playerX}/ ${playerY}"></div>`;
  boardGrid.innerHTML = htmlMarkup;
}
targetPositionGenerator();
initGame();
