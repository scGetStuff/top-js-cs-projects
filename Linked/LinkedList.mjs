import { Node } from './Node.mjs';

class LinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    get size() {
        return this.#size;
    }
    get head() {
        return this.#head;
    }
    get tail() {
        return this.#tail;
    }

    append(value) {
        const node = this.#createNode(value);

        if (this.#isFirtstNode(node)) return;

        this.#tail.nextNode = node;
        this.#tail = node;
    }

    prepend(value) {
        const node = this.#createNode(value);

        if (this.#isFirtstNode(node)) return;

        node.nextNode = this.#head;
        this.#head = node;
    }

    // 1 based
    at(index) {
        let node = this.#head;
        let i = 1;

        while (node != null) {
            if (i++ === index) break;
            node = node.nextNode;
        }

        if (node) return node.value;

        return null;
    }

    pop() {
        if (!this.#tail) return;

        if (this.#size === 1) {
            this.clear();
            return;
        }

        let node = this.#head;
        for (let i = 2; i < this.#size; i++) {
            node = node.nextNode;
        }
        node.nextNode = null;
        this.#tail = node;
        this.#size--;
    }

    contains(value) {
        let node = this.#head;

        while (node != null) {
            if (value === node.value) return true;
            node = node.nextNode;
        }

        return false;
    }

    find(value) {
        let node = this.#head;

        for (let i = 1; i <= this.#size; i++) {
            if (value === node.value) return i;
            node = node.nextNode;
        }

        return null;
    }

    insertAt(value, index) {
        if (index > this.#size) return;

        const newNode = this.#createNode(value);

        // replace head
        if (index === 1) {
            newNode.nextNode = this.#head;
            this.#head = newNode;
            return;
        }

        let parent = this.#head;
        for (let i = 2; i < index; i++) {
            parent = parent.nextNode;
        }
        newNode.nextNode = parent.nextNode;
        parent.nextNode = newNode;
    }

    // TODO: make it less stupid
    removeAt(index) {
        if (index > this.#size) return;

        // remove head
        if (index === 1) {
            this.#head = this.#head.nextNode;
            this.#size--;
            return;
        }

        let parent = this.#head;
        for (let i = 2; i < index; i++) {
            parent = parent.nextNode;
        }

        // remove tail
        if (index === this.#size) this.#tail = parent;

        const deleteNode = parent.nextNode;
        const thirdNode = deleteNode.nextNode;
        parent.nextNode = thirdNode;
        this.#size--;
    }

    #createNode(value) {
        this.#size++;
        return new Node(value);
    }

    // empty list, init head
    #isFirtstNode(node) {
        if (this.#size != 1) return false;
        this.#head = node;
        this.#tail = node;
        return true;
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    // ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        let node = this.#head;
        const str = [];

        while (node != null) {
            str.push(node.toString());
            node = node.nextNode;
        }
        str.push('null'); // retarded fucking spec
        return str.join(' -> ');
    }
}

export { LinkedList };
