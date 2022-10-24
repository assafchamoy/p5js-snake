const CANVAS_SIZE = 800;
const CANVAS_SCALE = 20;
const RECT_SIZE = 1;
const FRAME_RATE = 5;

let snake;
let food;
let retryBtnElem;
let gameOverMsgElem;
let soundClassifier;

function initGame () {
  snake = new Snake(RECT_SIZE, CANVAS_SCALE);
  food = new Food(RECT_SIZE, CANVAS_SCALE);
  food.generateFood(CANVAS_SCALE);
  loop();
  background(220);
  gameOverMsgElem.style.display = 'none';
}

function modelReady() {
  soundClassifier.classify((error, result) => {
    if(error) {
      console.error(error);
      return;
    }

    // Highest confidence result
    const { label } = result[0];

    // Voice controls
    switch (label) {
      case VOICE_UP:
        snake.move(GO_UP);
        break;
      case VOICE_DOWN:
        snake.move(GO_DOWN);
        break;
      case VOICE_LEFT:
        snake.move(GO_LEFT);
        break;
      case VOICE_RIGHT:
        snake.move(GO_RIGHT);
        break;
    }

  });
}

function setup () {
  // High confidence score for more accurate response
  const options = { probabilityThreshold: 0.95 };
  retryBtnElem = document.querySelector('.retryBtn');
  gameOverMsgElem = document.querySelector('.gameOverMsg');
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);

  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  frameRate(FRAME_RATE);
  initGame();
}

// Keyboard Controls

// function keyPressed () {
//   switch (keyCode) {
//     case UP_ARROW:
//       snake.move(KEYBOARD_UP);
//       break;
//     case DOWN_ARROW:
//       snake.move(KEYBOARD_DOWN);
//       break;
//     case LEFT_ARROW:
//       snake.move(KEYBOARD_LEFT);
//       break;
//     case RIGHT_ARROW:
//       snake.move(KEYBOARD_RIGHT);
//       break;
//   }
// }

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
