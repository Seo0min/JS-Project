let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img1 = new Image();
img1.src = 'dino.png';

let img2 = new Image();
img2.src = 'cactus.png';

let dino = {
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.drawImage(img1, this.x, this.y);
  },
};

class Cactus {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = 500;
    this.y = 250 - this.height;
  }
  draw() {
    ctx.drawImage(img2, this.x, this.y);
  }
}

let cactus = new Cactus();
cactus.draw();

// Animation(obstacle generation, dino jump)
let timer = 0;
let cactusArr = [];
let jump = false;
let jumpTimer = 0;
let gameFrame;

function animation() {
  gameFrame = requestAnimationFrame(animation);
  timer++;
  cactus.x -= 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 100 === 0) {
    let cactus = new Cactus();
    cactusArr.push(cactus);
  }

  cactusArr.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;

    collisionDetection(dino, a);

    a.draw();
  });

  if (jump == true) {
    dino.y -= 2;
    jumpTimer++;
  }
  if (jump == false) {
    if (dino.y < 200) {
      dino.y++;
    }
  }
  if (jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }

  dino.draw();
  cactus.draw();
}

animation();

// collision detection
function collisionDetection(dino, cactus) {
  let x = cactus.x - (dino.x + dino.width);
  let y = cactus.y - (dino.y + dino.height);
  if (x < 0 && y < 0) {
    cancelAnimationFrame(gameFrame);
    alert('Game over');
  }
}

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jump = true;
  }
});
