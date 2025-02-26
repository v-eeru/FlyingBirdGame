const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let bird = { x: 50, y: 200, width: 30, height: 30, velocity: 0 };
let gravity = 0.5;
let isGameOver = false;
let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;
let score = 0;

function drawBird() {
    ctx.fillStyle = "red";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

function updateGame() {
    if (isGameOver) return;

    bird.velocity += gravity;
    bird.y += bird.velocity;

    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + pipeWidth < 0) {
            pipes.shift();
            score++;
        }
    });

    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        isGameOver = true;
    }

    pipes.forEach(pipe => {
        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)) {
            isGameOver = true;
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();

    if (!isGameOver) requestAnimationFrame(updateGame);
}

function jump() {
    bird.velocity = -8;
}

document.addEventListener("keydown", jump);

setInterval(() => {
    if (isGameOver) return;
    let topHeight = Math.random() * (canvas.height / 2);
    pipes.push({ x: canvas.width, top: topHeight, bottom: topHeight + pipeGap });
}, 2000);

updateGame();
