class Food {
    #color = color(255,0,0);
    constructor(rectSize) {
        this.rectSize = rectSize;
        this.foodRect = [this.rectSize, this.rectSize];
        this.pos;
    }

    generateFood(scale) {
        const scaledW = width / CANVAS_SCALE;
        const scaledH = height / CANVAS_SCALE;
        this.pos = createVector(floor(random(scaledW)), floor(random(scaledH)));
    }

    render() {
        noStroke();
        fill(this.#color);
        rect(this.pos.x, this.pos.y, ...this.foodRect);
    }
}