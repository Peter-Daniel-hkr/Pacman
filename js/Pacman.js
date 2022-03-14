import MovingDirection from "./Input.js";

export default class Pacman {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.speed = speed;
    this.tileMap = tileMap;
    // keyboard input
    document.addEventListener("keydown", this.#keydown);

    this.#loadPacmanImages();
  }

  draw(ctx) {
    this.#move();
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );
  }

  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "../images/pac0.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "../images/pac1.png";

    const pacmanImage3 = new Image();
    pacmanImage3.src = "../images/pac2.png";

    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage2,
    ];

    this.pacmanImageIndex = 0;
  }

  // Legend: Keycode >> 37 = Left arrow; 38 = up arrow; 39 = right arrow; 40 = down arrow;
  #keydown = (event) => {
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstMove = true;
    }

    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstMove = true;
    }

    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstMove = true;
    }

    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
      this.madeFirstMove = true;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.speed;
        break;
      case MovingDirection.down:
        this.y += this.speed;
        break;
      case MovingDirection.left:
        this.x -= this.speed;
        break;
      case MovingDirection.right:
        this.x += this.speed;
        break;
    }
  }
}
