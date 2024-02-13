import Sprite from "./Sprite.js";
import { canvas, gravity } from "../main.js";

class Player extends Sprite {
  constructor({ position, imageSrc, frameRate, animations, frameBuffer }) {
    super({ imageSrc, frameRate, frameBuffer });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.height = 100;
    this.animations = animations;
    this.lastDirection = "right";

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;

      this.animations[key].image = image;
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) {
      return;
    }
    console.log(key);
    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update() {
    this.updateFrames();
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

export default Player;
