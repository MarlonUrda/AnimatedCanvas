import Player from "./js/Player.js";
import Sprite from "./js/Sprite.js";

export const canvas = document.createElement("canvas");
export const canctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 574;

export const gravity = 0.5;

const spike = new Sprite({
  position: {
    x: 300,
    y: 500,
  },
  imageSrc: "./i/Spikes.png",
  frameRate: 4,
  frameBuffer: 5,
});

const pl2 = new Player({
  position: {
    x: 500,
    y: 300,
  },

  imageSrc: "./i/Idle.png",
  frameRate: 4,
  animations: {
    Idle: {
      imageSrc: "./i/Idle.png",
      frameRate: 4,
      frameBuffer: 67,
    },
  },
});

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
  animations: {
    Idle: {
      imageSrc: "./img/warrior/Idle.png",
      frameRate: 8,
      frameBuffer: 9,
    },
    Run: {
      imageSrc: "./img/warrior/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./img/warrior/Jump.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: "./img/warrior/Fall.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: "./img/warrior/FallLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    RunLeft: {
      imageSrc: "./img/warrior/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    IdleLeft: {
      imageSrc: "./img/warrior/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: "./img/warrior/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const animate = () => {
  window.requestAnimationFrame(animate);

  canctx.fillStyle = "lightblue";
  canctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  pl2.update();
  spike.update();

  player.velocity.x = 0;

  if (keys.d.pressed) {
    player.switchSprite("Run");
    player.velocity.x = 2;
    player.lastDirection = "right";
  } else if (keys.a.pressed) {
    player.switchSprite("RunLeft");
    player.velocity.x = -2;
    player.lastDirection = "left";
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.switchSprite("Idle");
    else player.switchSprite("IdleLeft");
  }

  if (player.velocity.y < 0) {
    if (player.lastDirection === "right") player.switchSprite("Jump");
    else player.switchSprite("JumpLeft");
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === "right") player.switchSprite("Fall");
    else player.switchSprite("FallLeft");
  }
};

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case " ":
      player.velocity.y -= 10;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});

document.body.append(canvas);
