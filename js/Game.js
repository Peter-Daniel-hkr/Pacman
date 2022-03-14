import TileMap from "./TileMap.js";

const canvas = document.getElementById("game-canvas"),
  ctx = canvas.getContext("2d"),
  tileSize = 32,
  speed = 2,
  tileMap = new TileMap(tileSize),
  pacman = tileMap.getPacman(speed),
  ghosts = tileMap.getGhosts(speed);

function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx);
  ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
