const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width= 600
canvas.height = 600
canvas.style.border = "5px solid black";
const ctx = canvas.getContext("2d");

const keys = {};

class Tank {
  constructor(x, y, color, controls) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = 0;
    this.size = 30;
    this.speed = 2;
    this.controls = controls;
    this.bullets = [];
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.fillStyle = "#000";
    ctx.fillRect(this.size/4, -5, this.size/2, 10); // 炮管
    ctx.restore();

    this.bullets.forEach(bullet => bullet.draw());
  }

  update() {
    // 控制移動
    if (keys[this.controls.up]) this.y -= this.speed;
    if (keys[this.controls.down]) this.y += this.speed;
    if (keys[this.controls.left]) this.x -= this.speed;
    if (keys[this.controls.right]) this.x += this.speed;

    // 控制方向
    if (keys[this.controls.left]) this.angle = Math.PI;
    if (keys[this.controls.right]) this.angle = 0;
    if (keys[this.controls.up]) this.angle = -Math.PI / 2;
    if (keys[this.controls.down]) this.angle = Math.PI / 2;

    // 更新子彈
    this.bullets.forEach(bullet => bullet.update());
    this.bullets = this.bullets.filter(b => b.active);
  }

  shoot() {
    const bullet = new Bullet(this.x, this.y, this.angle, this.color);
    this.bullets.push(bullet);
  }
}

class Bullet {
  constructor(x, y, angle, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.color = color;
    this.speed = 5;
    this.size = 5;
    this.active = true;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    // 超出邊界
    if (
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height
    ) {
      this.active = false;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const tank1 = new Tank(100, 100, "red", {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
  shoot: " "
});

const tank2 = new Tank(700, 500, "blue", {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  shoot: "Enter"
});

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === tank1.controls.shoot) tank1.shoot();
  if (e.key === tank2.controls.shoot) tank2.shoot();
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tank1.update();
  tank2.update();

  tank1.draw();
  tank2.draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();