const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const startBtn = document.querySelector(".btn-start");
const scoreEl = document.getElementById("score");
const modalTitle = document.getElementById("modal-title");
const finalScore = document.getElementById("final-score");

const rows = 30;
const cols = 30;

let snake, food, direction, nextDirection, score, intervalId;
const blocks = {};


function createGrid() {
  board.innerHTML = "";
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const block = document.createElement("div");
      block.classList.add("block");
      board.appendChild(block);
      blocks[`${x}-${y}`] = block;
    }
  }
}


function generateFood() {
  let f;
  do {
    f = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  } while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}


function startGame() {
  score = 0;
  scoreEl.textContent = score;

  snake = [
    { x: 15, y: 14 },
    { x: 15, y: 13 },
    { x: 15, y: 12 },
  ];

  direction = "right";
  nextDirection = "right";
  food = generateFood();

  modal.classList.remove("active");
  clearInterval(intervalId);
  intervalId = setInterval(render, 200);
}


function render() {
  direction = nextDirection;

  Object.values(blocks).forEach(b =>
    b.classList.remove("fill", "food")
  );

  let head = { ...snake[0] };

  if (direction === "up") head.x--;
  if (direction === "down") head.x++;
  if (direction === "left") head.y--;
  if (direction === "right") head.y++;


  if (
    head.x < 0 || head.x >= rows ||
    head.y < 0 || head.y >= cols
  ) {
    gameOver();
    return;
  }

  const ateFood = head.x === food.x && head.y === food.y;

  snake.unshift(head);

  if (ateFood) {
    score++;
    scoreEl.textContent = score;
    food = generateFood();
  } else {
    snake.pop();
  }

  snake.forEach(s =>
    blocks[`${s.x}-${s.y}`].classList.add("fill")
  );

  blocks[`${food.x}-${food.y}`].classList.add("food");
}


function gameOver() {
  clearInterval(intervalId);
  modalTitle.textContent = "Game Over";
  finalScore.textContent = `Your Score: ${score}`;
  modal.classList.add("active");
}


addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "down") nextDirection = "up";
  else if (e.key === "ArrowDown" && direction !== "up") nextDirection = "down";
  else if (e.key === "ArrowLeft" && direction !== "right") nextDirection = "left";
  else if (e.key === "ArrowRight" && direction !== "left") nextDirection = "right";
});

startBtn.addEventListener("click", startGame);


createGrid();
