const canvas = document.createElement("canvas");
const point = document.getElementById("point");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

const player1 = {
    name: "player1",
    x: 100,
    y: 300,
    v: 7,
    vx: 0,
    vy: 0,
    jumpPower: 15,
    r: 40,
    onGround: false,
    color: "blue",
    leftKey: "d",
    rightKey: "g",
    jumpKey: "r",
    downKey: "f",
    killkey: "z",
    score: 0,

    reset: function () {
        this.x = 100;
        this.y = 300;
        this.v = 7;
        this.vx = 0;
        this.vy = 0;
        this.jumpPower = 15;
        this.r = 40;
        this.onGround = false;
    }
};

const player2 = {
    name: "player2",
    x: 700,
    y: 300,
    v: 7,
    vx: 0,
    vy: 0,
    jumpPower: 15,
    r: 40,
    onGround: false,
    color: "red",
    leftKey: "ArrowLeft",
    rightKey: "ArrowRight",
    jumpKey: "ArrowUp",
    downKey: "ArrowDown",
    killkey: "Enter",
    score: 0,

    reset: function () {
        this.x = 700;
        this.y = 300;
        this.v = 7;
        this.vx = 0;
        this.vy = 0;
        this.jumpPower = 15;
        this.r = 40;
        this.onGround = false;
    }
};

const ball = {
    x: 400,
    y: 50,
    vx: 0,
    vy: 0,
    r: 40,

    reset: function () {
        this.x = 400;
        this.y = 50;
        this.vx = 0;
        this.vy = 0;
        this.r = 40;
    }
};

const gravity = 0.5;
const friction = 0.9;
const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);
function updatePlayer1() {
    player1.x += player1.vx;
    if (keys[player1.leftKey] && player1.x > 0 + player1.r) player1.vx = -player1.v;
    else if (keys[player1.rightKey] && player1.x <= 390 - player1.r) player1.vx = player1.v;
    else player1.vx = 0;
    if (keys[player1.jumpKey] && player1.onGround) { player1.vy = -player1.jumpPower; player1.onGround = false; }

    player1.vy += gravity;
    player1.y += player1.vy;

    if (player1.y >= 350 - player1.r) { player1.y = 350 - player1.r; player1.vy = 0; player1.onGround = true; }
}

function updatePlayer2() {
    player2.x += player2.vx;
    if (keys[player2.leftKey] && player2.x >= 410 + player2.r) player2.vx = -player2.v;
    else if (keys[player2.rightKey] && player2.x < 800 - player2.r) player2.vx = player2.v;
    else player2.vx = 0;
    if (keys[player2.jumpKey] && player2.onGround) { player2.vy = -player2.jumpPower; player2.onGround = false; }

    player2.vy += gravity;
    player2.y += player2.vy;

    if (player2.y >= 350 - player2.r) { player2.y = 350 - player2.r; player2.vy = 0; player2.onGround = true; }
}


function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += gravity;

    if (ball.x - ball.r < 0) {
        ball.x = 0 + ball.r;
        ball.vx = 3;
    } else if (ball.x + ball.r > canvas.width) {
        ball.x = canvas.width - ball.r;
        ball.vx = -3;
    }

    if (ball.y - ball.r < 0) {
        ball.y = 0 + ball.r;
        ball.vy = 0;

    } else if (ball.y + ball.r > canvas.height - 50) {
        if (ball.x > 400) player1.score++;
        else player2.score++;
        point.value = player1.score + "|" + player2.score;
        player1.reset();
        player2.reset();
        ball.reset();
        document.getElementById("player1").value = ""
        document.getElementById("player2").value = ""
    }


    if ((Math.abs(ball.x - 400) <= ball.r + 5 && ball.y <= 225 - ball.r && ball.y >= 210 - ball.r)) {
        ball.vy = -10;
        ball.y = 100 + ball.r
    }
    else if (Math.abs(ball.x - 400) <= ball.r + 5 && ball.y >= 225 - ball.r) {
        ball.x = 400 + (ball.x > 400 ? 1.1 : -1.1) * (ball.r + 5);
        ball.vx = (ball.x > 400 ? 1 : -1);
    }


    [player1, player2].forEach(player => {
        let dx = ball.x - player.x;
        let dy = ball.y - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.r + player.r) {
            if (keys[player.killkey]) {
                if (keys[player.leftKey]) {
                    if (keys[player.downKey]) {
                        ball.vy = 7;
                        ball.vx = -5;
                        document.getElementById(player.name).value = "Down spike"
                    } else if (keys[player.jumpKey]) {
                        ball.vy = -15;
                        ball.vx = -10;
                        document.getElementById(player.name).value = "Up spike"
                    } else {
                        ball.vy = 0;
                        ball.vx = -15;
                        document.getElementById(player.name).value = "Normal spike"
                    }
                } else if (keys[player.rightKey]) {
                    if (keys[player.downKey]) {
                        ball.vy = 7;
                        ball.vx = 5;
                        document.getElementById(player.name).value = "Down spike"
                    } else if (keys[player.jumpKey]) {
                        ball.vy = -15;
                        ball.vx = 15;
                        document.getElementById(player.name).value = "Up spike"
                    } else {
                        ball.vy = 0;
                        ball.vx = 20;
                        document.getElementById(player.name).value = "Normal spike"
                    }
                }

            } else {
                ball.vx = (dx > 0 ? 1 : -1) * 8;
                ball.vy = -Math.abs(ball.vy) - 1;
                document.getElementById(player.name).value = ""
            }
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 350, canvas.width, 50);
    ctx.fillStyle = "brown";
    ctx.fillRect(canvas.width / 2 - 5, 200, 10, 150);

    [player1, player2].forEach(player => {
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    updatePlayer1();
    updatePlayer2();
    updateBall();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
