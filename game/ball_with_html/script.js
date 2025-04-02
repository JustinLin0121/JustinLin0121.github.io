var player = document.getElementById("pikacho1");
var player2 = document.getElementById("pikacho2");
var score = document.getElementById("score");
var ball = document.getElementById("ball");
var g = 0.7; //重力加速度
var point1 = 0;  // Example values
var point2 = 0;
var win = 0;


var posY = parseInt(window.getComputedStyle(player).bottom);
var posX = parseInt(window.getComputedStyle(player).left);
var velocityY = 0; //Y速度
var velocityX = 10; //X速度
var jumpPower = 23; //彈跳力1
var jumpPower2 = 20; //彈跳力2
var isJumping = false;
var isJumping2 = false;
var movingRight = false;
var movingLeft = false;

var posY2 = parseInt(window.getComputedStyle(player2).bottom);
var posX2 = parseInt(window.getComputedStyle(player2).left);
var velocityY2 = 0; //Y速度
var velocityX2 = 10; //X速度
var isJumping12 = false;
var isJumping22 = false;
var movingRight2 = false;
var movingLeft2 = false;

var ballY = parseInt(window.getComputedStyle(ball).bottom);
var ballX = parseInt(window.getComputedStyle(ball).left);
var ballVY = 0;
var ballVX = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === "d" && !movingLeft) {
        movingRight = true;
    } else if (event.key === "a" && !movingRight) {
        movingLeft = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === "d") {
        movingRight = false;
    } if (event.key === "a") {
        movingLeft = false;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "w" && !isJumping) {
        velocityY = jumpPower;
        isJumping = true;
    } else if (event.key === "w" && !isJumping2) {
        velocityY = jumpPower2;
        isJumping2 = true;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" && !movingLeft2) {
        movingRight2 = true;
    } else if (event.key === "ArrowLeft" && !movingRight2) {
        movingLeft2 = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === "ArrowRight") {
        movingRight2 = false;
    } if (event.key === "ArrowLeft") {
        movingLeft2 = false;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && !isJumping12) {
        velocityY2 = jumpPower;
        isJumping12 = true;
    } else if (event.key === "ArrowUp" && !isJumping22) {
        velocityY2 = jumpPower2;
        isJumping22 = true;
    }
});



function play() {
    if (!win) {
        ballX = 1;
    } else {
        ballX = 1129;
    }
    ballY = 530;
    ballVX = 0;
    ballVY = 0;
    posX = 0;
    posY = 0;
    posX2 = 1140;
    posY2 = 0;
    player.style.bottom = posY + "px";
    player2.style.bottom = posY2 + "px";
    player.style.left = posX + "px";
    player2.style.left = posX2 + "px";
    ball.style.bottom = ballY + "px";
    ball.style.left = ballX + "px";

    function update() {

        if (isJumping) {
            velocityY -= g;
            posY += velocityY;
        }
        if (isJumping12) {
            velocityY2 -= g;
            posY2 += velocityY2;
        }
        player.style.bottom = posY + "px";
        player2.style.bottom = posY2 + "px";


        if (posY <= 0) {
            player.style.bottom = "0px";
            velocityY = 0;
            isJumping = false;
            isJumping2 = false;
        }

        if (posY2 <= 0) {
            player2.style.bottom = "0px";
            velocityY2 = 0;
            isJumping12 = false;
            isJumping22 = false;
        }

        if (movingRight && posX < 530) {
            posX += velocityX;
        }

        if (movingRight2 && posX2 < 1140) {
            posX2 += velocityX2;
        }

        if (movingLeft && posX > 0) {
            posX -= velocityX;
        }

        if (movingLeft2 && posX2 > 610) {
            posX2 -= velocityX2;
        }
        player.style.left = posX + "px";
        player2.style.left = posX2 + "px";


        ballVY -= g;
        ballY += ballVY;
        ballX += ballVX;

        if (ballY <= 0) {
            if (ballX < 635) {
                point2 += 1;
                win = 1;
                score.value = point1 + "|" + point2;
            } else {
                win = 0;
                point1 += 1;
                score.value = point1 + "|" + point2;
            } requestAnimationFrame(play);
            return
        } else if (ballY >= 530) {
            ballY = 530;
            ballVY = 0;
        }
        if (ballX <= 0) {
            ballX = 0;
            ballVX = 7;
        } else if (ballX >= 1130) {
            ballX = 1130;
            ballVX = -7;
        }
        // ball wall
        if (ballY <= 250 && ballX >= 520 && ballX <= 530) {
            ballX = 520;
            ballVX = -Math.abs(ballVX);
        } else if (ballY <= 240 && ballX >= 600 && ballX <= 610) {
            ballX = 610;
            ballVX = Math.abs(ballVX);
        } else if (ballY <= 250 && ballY >= 220 && ballX >= 520 && ballX <= 610) {
            ballVY = Math.abs(ballVY);
            ballY = 250;
        }
        //ball player
        if (ballX >= posX - 60 && ballX <= posX + 50 && ballY <= posY + 150 && ballY >= posY + 120) {
            ballY = posY + 150;
            ballVY = Math.abs(velocityY * 0.8 + 20);
            ballVX += Math.abs(velocityX * (movingRight - movingLeft));
        } else if (ballY >= posY - 70 && ballY <= posY + 150 && ballX >= posX - 70 && ballX <= posX - 35) {
            ballX = posX - 70;
            ballVX = -Math.abs(ballVX + velocityX * movingLeft * 0.5);
            ballVY = Math.abs(velocityY * 0.8 + 20);
        } else if (ballY >= posY - 70 && ballY <= posY + 150 && ballX >= posX + 25 && ballX <= posX + 60) {
            ballX = posX + 60
            ballVX = Math.abs(ballVX + velocityX * movingRight * 0.5);
            ballVY = Math.abs(velocityY * 0.8 + 20);
        }


        if (ballX >= posX2 - 60 && ballX <= posX2 + 50 && ballY <= posY2 + 150 && ballY >= posY2 + 120) {
            ballY = posY2 + 150;
            ballVY = Math.abs(velocityY2 * 0.8 + 20);
            ballVX -= Math.abs(velocityX2 * (movingRight2 - movingLeft2));
        } else if (ballY >= posY2 - 70 && ballY <= posY2 + 150 && ballX >= posX2 - 70 && ballX <= posX2 - 35) {
            ballX = posX2 - 70;
            ballVX = -Math.abs(ballVX + velocityX2 * movingLeft2 * 0.5);
            ballVY = Math.abs(velocityY * 0.8 + 20);
        } else if (ballY >= posY2 - 70 && ballY <= posY2 + 150 && ballX >= posX2 + 25 && ballX <= posX2 + 60) {
            ballX = posX2 + 60
            ballVX = Math.abs(ballVX + velocityX2 * movingRight2 * 0.5);
            ballVY = Math.abs(velocityY2 * 0.8 + 20);
        }


        ball.style.bottom = ballY + "px";
        ball.style.left = ballX + "px";

        requestAnimationFrame(update);
    }
    update();
}
play();


