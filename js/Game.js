import TileMap from "./TileMap.js";

const canvas = document.getElementById("game-canvas"),
  ctx = canvas.getContext("2d"),
  GAME_OVER = document.getElementById("game-over"),
  YOU_WON = document.getElementById("you-won"),
  YOU_LOSE = document.getElementById("you-lose"),
  restart = document.getElementById("restart"),
  gameOverSound = new Audio("sounds/game_over.wav"),
  gameWinSound = new Audio("sounds/game_win.wav"),
  tileSize = 32,
  speed = 2,
  tileMap = new TileMap(tileSize),
  pacman = tileMap.getPacman(speed),
  ghosts = tileMap.getGhosts(speed);

let gameOver = false,
  gameWin = false;

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), ghosts);
  ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return ghosts.some(
    (ghost) => !pacman.powerDotActive && ghost.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    showYouWon();
    if (gameOver) {
      showYouLose();
    }
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);

restart.addEventListener("click", function () {
  location.reload();
});

function showYouWon() {
  GAME_OVER.style.display = "block";
  YOU_WON.style.display = "block";
}

function showYouLose() {
  GAME_OVER.style.display = "block";
  YOU_LOSE.style.display = "block";
}
