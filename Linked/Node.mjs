class Node {
    constructor(value) {
        this.#value = value;
    }

    #value = null;
    nextNode = null;

    get value() {
        return this.#value;
    }
    
    toString() {
        return `( ${this.value} )`;
    }
}

export { Node };
