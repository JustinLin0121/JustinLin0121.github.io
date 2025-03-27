var player = document.getElementById("pikacho1");
var posY = parseInt(window.getComputedStyle(player).bottom);
var posX = parseInt(window.getComputedStyle(player).left);
var velocityY = 0; // Initial velocity
var velocityX = 0; // Initial velocity
var g = 1.2; // Gravity
var jumpPower = 25; // Power of the jump
var jumpPower2 = 20;
var isJumping = false;
var isJumping2 = false;
var movingRight = false;
var movingLeft = false;

// 按下右箭头键时开始向右移动
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" && !movingRight) {
        movingRight = true;  // 标记为按住右箭头
    } else if (event.key === "ArrowLeft" && !movingRight) {
        movingLeft = true;  // 标记为按住右箭头
    }
});

// 松开右箭头键时停止向右移动
document.addEventListener('keyup', function (event) {
    if (event.key === "ArrowRight") {
        movingRight = false;  // 标记为没有按住右箭头
    } if (event.key === "ArrowLeft") {
        movingLeft = false;  // 标记为没有按住右箭头
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
        velocityY -= g; // Gravity pulls the player down
        posY += velocityY; // Update position based on velocity

    }
    player.style.bottom = posY + "px"; // Update the player's position
    if (posY <= 0) {
        player.style.bottom = "0px";
        velocityY = 0;
        isJumping = false;
        isJumping2 = false;
    }

    if (movingRight) {
        posX += 10; // Update position based on velocity
    }
    if (movingLeft) {
        posX -= 10; // Update position based on velocity
    } player.style.left = posX + "px";

    requestAnimationFrame(update);
}
update();
