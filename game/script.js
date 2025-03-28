var player = document.getElementById("pikacho1");
var ball = document.getElementById("ball");
var g = 1.2; //重力加速度


var posY = parseInt(window.getComputedStyle(player).bottom);
var posX = parseInt(window.getComputedStyle(player).left);
var velocityY = 0; //Y速度
var velocityX = 0; //X速度
var jumpPower = 25; //彈跳力1
var jumpPower2 = 20; //彈跳力2
var isJumping = false;
var isJumping2 = false;
var movingRight = false;
var movingLeft = false;


var ballY = parseInt(window.getComputedStyle(ball).bottom);
var ballX = parseInt(window.getComputedStyle(ball).left);
var ballVY = 0;
var ballVX = 0;



document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" && !movingLeft) {
        movingRight = true;
    } else if (event.key === "ArrowLeft" && !movingRight) {
        movingLeft = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === "ArrowRight") {
        movingRight = false;
    } if (event.key === "ArrowLeft") {
        movingLeft = false;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && !isJumping) {
        velocityY = jumpPower;
        isJumping = true;
    } else if (event.key === "ArrowUp" && !isJumping2) {
        velocityY = jumpPower2;
        isJumping2 = true;
    }
});

function update() {

    if (isJumping) {
        velocityY -= g;
        posY += velocityY;
    }
    player.style.bottom = posY + "px";

    if (posY <= 0) {
        player.style.bottom = "0px";
        velocityY = 0;
        isJumping = false;
        isJumping2 = false;
    }
    if (movingRight && posX < 530) {
        posX += 10;
    }
    if (movingLeft && posX > 0) {
        posX -= 10;
    } player.style.left = posX + "px";


    ballVY -= g;
    ballY += ballVY;
    if (ballY <= 0) {
        ballY = 0;
        ballVY *= -1;
    } else if (ballY >= 530) {
        ballY = 530;
        ballVY *= -1;
    }
    ball.style.bottom = ballY + "px";



    requestAnimationFrame(update);
}
update();
