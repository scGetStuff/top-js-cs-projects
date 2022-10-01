class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    toString() {
        return `( ${this.data} )`;
    }
}

export { Node };
