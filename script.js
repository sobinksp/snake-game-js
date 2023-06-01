let targetX, targetY;
function targetPositionGenerator() {
  targetX = Math.floor(Math.random() * 30) + 1;
  targetY = Math.floor(Math.random() * 30) + 1;
}

// const boardGrid = document.querySelector(".board");
function initGame() {
  const boardGrid = document.querySelector(".board");
  let htmlMarkup = `<div class ="target" style="grid-area: ${targetY}/ ${targetX}"></div>`;
  boardGrid.innerHTML = htmlMarkup;
}
targetPositionGenerator();
initGame();
