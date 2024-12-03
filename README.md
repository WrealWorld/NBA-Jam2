const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Colors
const BALL_COLOR = 'orange';
const PLAYER_COLOR = 'white';
const HOOP_COLOR = 'brown';

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 15,
  dx: 5,
  dy: -5,
};

// Hoop properties
const hoop = {
  x: canvas.width - 150,
  y: canvas.height / 2 - 50,
  width: 100,
  height: 10,
};

// Player properties
const player = {
  x: 50,
  y: canvas.height / 2 - 50,
  width: 20,
  height: 100,
  speed: 7,
};

// Score
let score = 0;

// Input handling
let keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));

// Draw functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = BALL_COLOR;
  ctx.fill();
  ctx.closePath();
}

function drawHoop() {
  ctx.fillStyle = HOOP_COLOR;
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
}

function drawPlayer() {
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

// Game logic
function update() {
  // Move player
  if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
  if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy = -ball.dy;

  // Ball collision with player
  if (
    ball.x - ball.radius < player.x + player.width &&
    ball.y > player.y &&
    ball.y < player.y + player.height
  ) {
    ball.dx = -ball.dx;
  }

  // Ball scoring through the hoop
  if (
    ball.x + ball.radius > hoop.x &&
    ball.y > hoop.y &&
    ball.y < hoop.y + hoop.height
  ) {
    score++;
    resetBall();
    updateScore();
  }

  // Reset ball if it goes off-screen
  if (ball.x - ball.radius < 0) {
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
  ball.dy = -5;
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawHoop();
  drawPlayer();

  update();

  requestAnimationFrame(gameLoop);
}

// Start the game
updateScore();
gameLoop();
