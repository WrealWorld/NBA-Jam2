// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 4,
  radius: 10,
  dx: 2, // Horizontal velocity
  dy: 0, // Vertical velocity
  gravity: 0.5, // Gravity force
  bounce: -0.7, // Bounce effect
};

// Player properties
let player = {
  x: canvas.width / 2,
  y: canvas.height - 40,
  width: 20,
  height: 20,
  dx: 5, // Speed for left/right movement
  rotation: 0, // Player rotation angle
};

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.dx;
  if (e.key === "ArrowRight") player.x += player.dx;
  if (e.key === "ArrowUp") player.rotation -= 15; // Rotate counterclockwise
  if (e.key === "ArrowDown") player.rotation += 15; // Rotate clockwise
});

// Update ball position and physics
function updateBall() {
  // Apply gravity
  ball.dy += ball.gravity;
  ball.y += ball.dy;
  ball.x += ball.dx;

  // Floor collision
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.dy *= ball.bounce; // Bounce back
  }

  // Left wall collision (unpredictable bounce)
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.dx = Math.random() * 4 + 2; // Random horizontal velocity
    ball.dy = Math.random() * -4 - 2; // Random upward velocity
  }

  // Right wall collision (out of bounds)
  if (ball.x + ball.radius > canvas.width) {
    resetBall(); // Reset the ball
  }
}

// Reset ball position with throw-in
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 4;
  ball.dx = Math.random() * -4 - 2; // Random horizontal velocity
  ball.dy = 0; // Reset vertical velocity
}

// Update player position and ensure it's within bounds
function updatePlayer() {
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Draw the player with rotation
function drawPlayer() {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.rotate((player.rotation * Math.PI) / 180);
  ctx.fillStyle = "blue";
  ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
  ctx.restore();
}

// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateBall();

  drawPlayer();
  drawBall();

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
