class Snake {
  #color = color(135, 169, 88);
  constructor (rectSize) {
    this.rectSize = rectSize;
    this.body = [createVector(0, 0)];
    this.snakeRect = [this.rectSize, this.rectSize];
    this.dir = createVector(0, 0);
    this.pos = createVector(0, 0);
  }

  render() {
    for(let bodyPart of this.body) {
        noStroke();
        fill(this.#color);
        rect(bodyPart.x, bodyPart.y, ...this.snakeRect);
    }
  }

   #getSneakHead() {
    return this.body.slice(-1)[0].copy();
  }

  move(dir) {
    switch(dir) {
        case GO_UP:
            this.dir = createVector(0, -1);
        break;
        case GO_DOWN:
            this.dir = createVector(0, 1);  
        break;
        case GO_LEFT:
            this.dir = createVector(-1, 0);
        break;
        case GO_RIGHT:
            this.dir = createVector(1, 0);
        break;
    }
  }

  update() {
    const sneakHead = this.#getSneakHead();

    this.body.shift();
    sneakHead.x += this.dir.x;
    sneakHead.y += this.dir.y;
    
    this.pos.x = sneakHead.x;
    this.pos.y = sneakHead.y;
    
    this.body.push(sneakHead);

  }

  #grow() {
    const headCpy = this.#getSneakHead();
    this.body.push(headCpy);
  }

  eat(food) {
    // Collision detection
    const didSnakeEat = this.pos.x === food.pos.x && this.pos.y === food.pos.y;
    if(didSnakeEat) {
        this.#grow();
    }
    
    return didSnakeEat;
  }

  checkEndGame() {
    const scaledW = width / CANVAS_SCALE;
    const scaledH = height / CANVAS_SCALE;

    const selfCollision = this.body.slice(0, -1).some((bodyPart) => {
        return this.pos.x === bodyPart.x && this.pos.y === bodyPart.y;
    });

    const validateTopWall = this.pos.y < 0;
    const validateBottom = this.pos.y > scaledH;
    const validateLeftWall = this.pos.x < 0;
    const validateRightWall = this.pos.x > scaledW;

    const wallsCollision = validateTopWall || validateBottom || validateLeftWall || validateRightWall;

    return wallsCollision || selfCollision;
  }
}
