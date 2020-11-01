// DOM ELEMENTS
// ============
const rulesBTn =  document.getElementById('rules-btn');
const closeBtn =  document.getElementById('close-btn');
const rules =  document.getElementById('rules');
const convas = document.getElementById('canvas');

// GLOBAL VARIABLES
// ================

let score = 0;
const brickRows = 9;
const brickCols = 5;
const ctx = canvas.getContext('2d');
const brickWall = [];

const ball = {
    size:10,
    speed:4,
    dx: 4,
    dy: -4,
    x: canvas.width/2,
    y: canvas.height/2,
};

const paddle = {
    x: canvas.width/2 - 40,
    y: canvas.height - 20,
    w:80,
    h:10,
    speed:8,
    dx:0
}

const brick = {
    w:70,
    h:20,
    padding:10,
    offsetX:45,
    offsetY:60,
    visible: true
}


// EVENT-LISTENERS
// ===============

rulesBTn.addEventListener('click', ()=>{ rules.classList.add('show');
});
closeBtn.addEventListener('click', ()=>{ rules.classList.remove('show');
});

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// FUNCTIONS
// =========
// arc(x, y, radius, startAngle, endAngle, anticlockwise)
function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2, true);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
};

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

function drawScore(){
    ctx.font='20px Arial';
    ctx.fillText(`Score: ${score}`,convas.width -100, 30);
}


// createBrickWall() - creates a matrix arrray of bricks
function createBrickWall(){
    for(let i=0; i < brickRows; i++){
        brickWall[i]=[];
        for(let j=0; j<brickCols; j++){
            const x = i*(brick.w + brick.padding) +brick.offsetX;
            const y = j*(brick.h + brick.padding) +brick.offsetY;
            brickWall[i][j] = {x, y, ...brick};
        }
    }
}

// drawBrickWall() - render Brick Wall
// ---------------
function drawBrickWall(){
brickWall.forEach((column) => {
    column.forEach((brick)=>{
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
        ctx.fill();
        ctx.closePath();
    });
});
}
createBrickWall();

// drawAll() - renders all objects on canvas
// ---------
function drawAll(){
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear canvas
    drawPaddle();
    drawBall();
    drawScore();
    drawBrickWall();
}

// movePaddle() - moves paddle left or right
// ------------
function movePaddle(){
    paddle.x += paddle.dx;

    // Wall detection
    if(paddle.x  + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

// keyDown() - press down on right or left arrow key on keyboard
// ---------
function keyDown(e){
if(e.key == 'Right' || e.key == 'ArrowRight'){
    paddle.dx = paddle.speed;
} else if (e.key == 'left' || e.key == 'ArrowLeft'){
    paddle.dx = -paddle.speed
}
}

// keyUp() - release key
// -------
function keyUp(e){
if(e.key == 'Right' || e.key == 'ArrowRight' || e.key == 'Left' || e.key == 'ArrowLeft' ){
    paddle.dx=0;
}
}

// function moveBall()
// -------------------
// 1. Check for Wall Collisions
// 2. Check for Brick Collisions
// 3. Check if Paddle Hits the Ball
// 4. Check if Paddle Misses the Ball
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision on side walls
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *=-1;
    }
    // Wall collision on top/bottom walls
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *=-1;
    }

    // BrickWall Collision
    brickWall.forEach(
        (column)=>{
            column.forEach((brick)=>{
                if(brick.visible){
                    if(ball.x - ball.size > brick.x && // left brick side check
                        ball.x + ball.size < brick.x + brick.w && // right brick side check
                        ball.y + ball.size > brick.y && // top brick side check
                        ball.y - ball.size < brick.y + brick.h){ // bottom brick side check
                            ball.dy *= -1;
                            brick.visible = false;
                            increaseScore(); 
                        }
                    }
                });
            }
        );
        
    // Paddle Hits the Ball
    if(ball.x - ball.size > paddle.x && 
       ball.x + ball.size < paddle.x + paddle.w && 
       ball.y + ball.size > paddle.y){
        ball.dy=-ball.speed;
    }
    // Paddle Misses the Ball 
    if(ball.y + ball.size > canvas.height){
        resetBrickWall();
        score=0;
    }
}

// increaseScore() - increase score and reset game if all brings hit
// ---------------
function increaseScore(){
    score++;
    if(score %(brickRows*brickCols)=== 0){
        resetBrickWall();
    }
}

// resetBrickWall() - reset Wall 
// ----------------
function resetBrickWall(){
    brickWall.forEach((column)=>{
        column.forEach((brick)=>{brick.visible = true});
    });
}

// runGame() - continuous recursion of frames moving paddle, move ball and render animation 
// --------
// The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
function runGame(){
    movePaddle();
    moveBall();
    drawAll();
    requestAnimationFrame(runGame); // argument is self recursion
}
runGame();