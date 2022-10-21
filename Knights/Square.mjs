class Square {
    constructor(x, y, name) {
        this.name = name;
        this.address = new Point(x, y);
    }

    // array of Points
    moves = [];

    toString() {
        return `( ${this.name} )`;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        // for printing negative numbers, when debugging defineMoves()
        // return `${this.x}`.padStart(2) + "," + `${this.y}`.padStart(2);
        return `[${this.x},${this.y}]`;
    }

    isEqual(point) {
        return this.x === point.x && this.y === point.y;
    }
}

export { Square, Point };
