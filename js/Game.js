import TileMap from "./TileMap.js";

const canvas = document.getElementById("game-canvas"),
  ctx = canvas.getContext("2d"),
  tileSize = 32,
  tileMap = new TileMap(tileSize);

function gameLoop() {
  tileMap.draw(ctx);
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
