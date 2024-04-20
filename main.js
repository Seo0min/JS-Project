let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img1 = new Image();
img1.src = 'dino.png';

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
    this.width = 20 + getRandomInt(-3, 4);
    this.height = 30 + getRandomInt(-3, 4);
    this.x = 500;
    this.y = 250 - this.height;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let cactus = new Cactus();
cactus.draw();

// Animation(obstacle generation, dino jump)
let timer = 0;
let cactusArr = [];
let gameState = 0; // 0: end, 1: start
let jump = false;
let jumpTimer = 0;
let gameFrame;
let life = 5;
let score = 0;

function animation() {
  gameFrame = requestAnimationFrame(animation);
  timer++;
  cactus.x -= 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    let cactus = new Cactus();
    cactusArr.push(cactus);
  }

  cactusArr.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
      score += 10;
      document.querySelector('#score').innerHTML = score;
    } else if (collisionDetection(dino, a) < 0) {
      o.splice(i, 1);
    }
    a.x -= 2;
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
}

animation();

// collision detection
function collisionDetection(dino, cactus) {
  let x = cactus.x - (dino.x + dino.width);
  let y = cactus.y - (dino.y + dino.height);
  if (x < 0 && y < 0) {
    life--;
    document.querySelector('#life').innerHTML = life;
    if (life == 0) {
      alert(`Game over. You got ${score} points`);
      gameState = 0;
      cancelAnimationFrame(animation);
      location.reload();
    }
    return -1;
  } else {
    return 1;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code == 'Space') {
    if (gameState == 0) {
      gameState = 1;
      frameAction();
      document.querySelector('#h2').style.display = 'none';
    } else if (gameState == 1) {
      jump = true;
    }
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
