import MovingDirection from "./Input.js";

export default class Pacman {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.speed = speed;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimationTimer = null;

    this.pacmanRotation = this.Rotation.right;
    this.eatDotSound = new Audio();
    this.eatDotSound.src = "sounds/eat_dot.wav";

    this.powerDotSound = new Audio();
    this.powerDotSound.src = "sounds/power_dot.wav";
    this.powerDotActive = false;
    this.powerDotAboutToExpire = false;
    this.timers = [];

    this.eatGhostSound = new Audio("sounds/eat_ghost.wav");

    this.madeFirstMove = false;

    document.addEventListener("keydown", this.#keydown); // keyboard input

    this.#loadPacmanImages();

    //  score logic
    this.score = 0;
    this.dom_score = document.querySelector("#score");
  }

  Rotation = {
    right: 0,
    down: 1,
    left: 2,
    up: 3,
  };

  draw(ctx, pause, ghosts) {
    if (!pause) {
      this.#move();
      this.#animate();
    }
    this.#eatDot();
    this.#eatPowerDot();
    this.#eatGhost(ghosts);

    const size = this.tileSize / 2;

    ctx.save();
    ctx.translate(this.x + size, this.y + size);
    ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );

    ctx.restore();
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

  #keydown = (event) => {
    //Arrow left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstMove = true;
    }
    //Arrow up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstMove = true;
    }
    //Arrow right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstMove = true;
    }
    //Arrow down
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
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      this.pacmanAnimationTimer = null;
      this.pacmanImageIndex = 1;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.pacmanAnimationTimer == null
    ) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.speed;
        this.pacmanRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.speed;
        this.pacmanRotation = this.Rotation.down;
        break;
      case MovingDirection.left:
        this.x -= this.speed;
        this.pacmanRotation = this.Rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.speed;
        this.pacmanRotation = this.Rotation.right;
        break;
    }
  }

  #animate() {
    if (this.pacmanAnimationTimer == null) {
      return;
    }
    this.pacmanAnimationTimer--;
    if (this.pacmanAnimationTimer == 0) {
      this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
      this.pacmanImageIndex++;
      if (this.pacmanImageIndex == this.pacmanImages.length)
        this.pacmanImageIndex = 0;
    }
  }

  #eatDot() {
    if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
      this.score += 1;
      this.dom_score.innerHTML = `${this.score}`;
      this.eatDotSound.play();
    }
  }

  #eatPowerDot() {
    if (this.tileMap.eatPowerDot(this.x, this.y)) {
      this.score += 10;
      this.dom_score.innerHTML = `${this.score}`;
      this.powerDotSound.play();
      this.powerDotActive = true;
      this.powerDotAboutToExpire = false;
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];

      let powerDotTimer = setTimeout(() => {
        this.powerDotActive = false;
        this.powerDotAboutToExpire = false;
      }, 1000 * 6);

      this.timers.push(powerDotTimer);

      let powerDotAboutToExpireTimer = setTimeout(() => {
        this.powerDotAboutToExpire = true;
      }, 1000 * 3);

      this.timers.push(powerDotAboutToExpireTimer);
    }
  }

  #eatGhost(ghosts) {
    if (this.powerDotActive) {
      const collideGhosts = ghosts.filter((ghost) => ghost.collideWith(this));
      collideGhosts.forEach((ghost) => {
        ghosts.splice(ghosts.indexOf(ghost), 1);
        this.score += 50;
        this.dom_score.innerHTML = `${this.score}`;
        this.eatGhostSound.play();
      });
    }
  }
}
