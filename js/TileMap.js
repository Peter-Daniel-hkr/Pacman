import Pacman from "./Pacman.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.yellowDot = new Image();
    this.yellowDot.src = "images/yellowDot.png";
    // this.yellowDot.src = "https://i.ibb.co/vsqT0FR/bonbon.gif";

    this.pinkDot = new Image();
    this.pinkDot.src = "images/pinkDot.png";

    this.wall = new Image();
    this.wall.src = "images/wall.png";

    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
  }

  // Legend:>> 0 - dots; 1 - wall; 2 - empty space; 3 - ghost; 4 - pacman; 5 - power pellet
  gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 1, 2, 2, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 2, 2, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  // Legend:>> 0 - dots; 1 - wall; 2 - empty space; 3 - ghost; 4 - pacman; 5 - power pellet
  draw(ctx) {
    for (let row = 0; row < this.gameMap.length; row++) {
      for (let column = 0; column < this.gameMap[row].length; column++) {
        let tile = this.gameMap[row][column];
        if (tile === 0) {
          this.#drawDot(ctx, column, row, this.tileSize);
        } else if (tile === 1) {
          this.#drawWall(ctx, column, row, this.tileSize);
        } else if (tile == 2) {
          this.#drawBlank(ctx, column, row, this.tileSize);
        } else {
          this.#drawPowerDot(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  #drawDot(ctx, column, row, size) {
    ctx.drawImage(
      this.yellowDot,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawPowerDot(ctx, column, row, size) {
    this.powerDotAnmationTimer--;
    if (this.powerDotAnmationTimer === 0) {
      this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
      if (this.powerDot == this.pinkDot) {
        this.powerDot = this.yellowDot;
      } else {
        this.powerDot = this.pinkDot;
      }
    }
    ctx.drawImage(this.powerDot, column * size, row * size, size, size);
  }

  #drawWall(ctx, column, row, size) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillStyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  getPacman(speed) {
    for (let row = 0; row < this.gameMap.length; row++) {
      for (let column = 0; column < this.gameMap[row].length; column++) {
        let tile = this.gameMap[row][column];
        if (tile === 4) {
          // 4 --> pacman
          this.gameMap[row][column] = 0;
          return new Pacman(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            speed,
            this
          );
        }
      }
    }
  }

  setCanvasSize(canvas) {
    canvas.width = this.gameMap[0].length * this.tileSize;
    canvas.height = this.gameMap.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.gameMap[row][column];
      // Legend:>> 0 - dots; 1 - wall; 2 - empty space; 3 - ghost; 4 - pacman; 5 - power pellet
      // if tile === 1, we're colliding with a wall
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }
}