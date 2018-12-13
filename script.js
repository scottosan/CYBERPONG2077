//canvas is referenced in js to render it for game
var canvas = document.getElementById("myCanvas");
//ctx is the tool that we can use to paint on it
//All variables are defined on the top here
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 4;
var dy = -4;

var paddleHeight = 10;
var paddleWidth = 120;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 10;
var brickColumnCount = 15;
var brickWidth = 47;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 50;
/*create array to hold all the bricks. the code will loop through and create new bricks*/
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r =0; r<brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}
//the buttons begin as false as they have not been pressed yet.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// key up and key down for controls of the paddle
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed =  true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//collision detection works by collating the rows and columns of all the bricks and storing them into var b. once in var b, the condition is that if
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount) {
                document.getElementById("winLose").innerHTML = "CONGRATULATIONS YOU WON!";
                onWin();
                 document.getElementById("winLose").addEventListener("click", function(){document.location.reload();})
                     clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawBall(){
ctx.beginPath();
ctx.arc(x, y,ballRadius,0, Math.PI*2);
ctx.fillStyle = "#FFAA0E";
ctx.fill();
ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#D5E82A";
    ctx.fill();
    ctx.closePath();
}

/*loop through the rows and columns to set the x and y position of each brick. The loop function ensures each brick has their own position but remain the same in size.*/

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "rgba(255,13,255,0.6)";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00FFE0";
    ctx.fillText("SCORE: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00FFE0";
    ctx.fillText("SECURE HACKING NODES LEFT: " + lives, canvas.width-348, 20);
}

function draw(){
ctx.clearRect(0,0, canvas.width, canvas.height);
drawBricks();
drawBall();
drawPaddle();
drawScore();
drawLives();
collisionDetection();
/*statement below states that if the displacement of x or y is greater than its sides minus the radius of the ball it will go in the opposite direction. */
if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){ dx = -dx;
}
if(y + dy < ballRadius) {
    dy =- dy;
/*condition so that the ball will reflect off the paddle*/
} else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth){
        dy = -dy;
    }
    else{
    lives--;
    if(!lives) {
    document.getElementById("winLose").innerHTML = "GAME OVER! YOUR SCORE: [ " + score + " ]   CLICK TO TRY AGAIN";
    on();
    document.getElementById("winLose").addEventListener("click", function(){document.location.reload();})
    clearInterval(interval);
}else{
    x = canvas.width/2;
    y = canvas.height-30;
    dx= 5 ;
    dy= -5;
    paddleX = (canvas.width-paddleWidth)/2;
    }
}
}
//paddle speed when pressed is 7
if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 9;
}
else if(leftPressed && paddleX > 0) {
    paddleX -= 9;
}
x += dx;
y += dy;
}
//frame rate settings

var interval = setInterval(draw, 10000000);

function play(){
    document.getElementById("start");
    setInterval(draw,10);
    off1();
}

function speed(){
    document.getElementById("nametag");
    setInterval(draw,100);
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function on1() {
  document.getElementById("startscreen").style.display = "block";
}

function off1() {
  document.getElementById("startscreen").style.display = "none";
}

function onWin() {
  document.getElementById("winscreen").style.display = "block";
}

function offWin() {
  document.getElementById("winscreen").style.display = "none";
}
