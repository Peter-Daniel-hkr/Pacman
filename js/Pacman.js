export default class Pacman {
  constructor(x, y, tileSize, speed, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.speed = speed;
    this.tileMap = tileMap;
    this.#loadPacmanImages();
  }

  draw(ctx) {}

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
}
