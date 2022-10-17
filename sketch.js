const CANVAS_SCALE = 30;
const RECT_SIZE = 1;
const FRAME_RATE = 10;

let snake;
let food;
let retryBtnElem;
let gameOverMsgElem;

function initGame () {
  snake = new Snake(RECT_SIZE, CANVAS_SCALE);
  food = new Food(RECT_SIZE, CANVAS_SCALE);
  food.generateFood(CANVAS_SCALE);
  loop();
  background(220);
  gameOverMsgElem.style.display = 'none';
}

function setup () {
  retryBtnElem = document.querySelector('.retryBtn');
  gameOverMsgElem = document.querySelector('.gameOverMsg');

  createCanvas(800, 800);
  frameRate(FRAME_RATE);
  initGame();
}

function keyPressed () {
  switch (keyCode) {
    case UP_ARROW:
      snake.move(GO_UP);
      break;
    case DOWN_ARROW:
      snake.move(GO_DOWN);
      break;
    case LEFT_ARROW:
      snake.move(GO_LEFT);
      break;
    case RIGHT_ARROW:
      snake.move(GO_RIGHT);
      break;
  }
}

function renderEndGame () {
  noLoop();
  background(255, 0, 0);
  gameOverMsgElem.style.display = 'block';

  retryBtnElem.addEventListener('click', () => {
    initGame();
  })
}

function draw () {
  scale(CANVAS_SCALE);
  background(220);
  food.render();

  snake.update();
  snake.render();

  if (snake.checkEndGame(CANVAS_SCALE)) {
    renderEndGame();
  }

  if (snake.eat(food)) {
    food.generateFood(CANVAS_SCALE);
  }
}
