import TileMap from "./TileMap.js";
import Sound from "./Sound.js";

const canvas = document.getElementById("game-canvas"),
  ctx = canvas.getContext("2d"),
  GAME_OVER = document.getElementById("game-over"),
  YOU_WON = document.getElementById("you-won"),
  YOU_LOSE = document.getElementById("you-lose"),
  restart = document.getElementById("restart"),
  soundElement = document.getElementById("sound"),
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
      Sound.gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      Sound.gameOverSound.play();
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
    drawHighScore();
    if (gameOver) {
      showYouLose();
      drawHighScore();
    }
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);

soundElement.addEventListener("click", audioManager);

export function audioManager() {
  let imgSrc = soundElement.getAttribute("src");
  let SOUND_IMG =
    imgSrc === "images/volume-on.png"
      ? "images/volume-mute.png"
      : "images/volume-on.png";

  soundElement.setAttribute("src", SOUND_IMG);
  Sound.gameWinSound.muted = Sound.gameWinSound.muted ? false : true;
  Sound.gameOverSound.muted = Sound.gameOverSound.muted ? false : true;
  Sound.eatDotSound.muted = Sound.eatDotSound.muted ? false : true;
  Sound.powerDotSound.muted = Sound.powerDotSound.muted ? false : true;
  Sound.eatGhostSound.muted = Sound.eatGhostSound.muted ? false : true;
}

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

function drawHighScore() {
  let highScore = JSON.parse(localStorage.getItem("High Score"));
  ctx.fillStyle = "gold";
  ctx.textAlign = "center";
  ctx.font = "bold 35px 'Fun Games', sans-serif";
  ctx.fillText("HIGHEST SCORE : " + highScore, canvas.width / 2, 26);
}
