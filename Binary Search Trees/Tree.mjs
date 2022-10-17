import { Node } from "./Node.mjs";

const cl = console.log;

class Tree {
    constructor(arr = []) {
        arr = Array.from(new Set(arr));
        arr.sort((a, b) => a - b);
        this.root = buildTree(arr);
    }

    // TODO: i kind of hate the way i did this; stupid looking code in append
    // brain stuck with a specific approach
    insert(value) {
        const newNode = new Node(value);
        appendLeaf(this.root, newNode);
    }

    delete(value) {
        // TODO: this could put things in a bad state
        // there are no requirements for handeling empty root
        // the point is familarity with the BST algorithm, not coding defensivly
        if (this.root.data === value) {
            this.root = deleteNode(this.root);
            return;
        }

        deleteChild(this.root, value);
    }

    find(value) {
        let node = this.root;

        while (node) {
            if (node.data === value) break;
            node = nextNode(node, value);
        }
        return node;
    }

    levelOrderIterative(cb = null) {
        const out = [];
        const discQ = [];

        discQ.push(this.root);

        while (discQ.length > 0) {
            const len = discQ.length;
            for (let i = 0; i < len; i++) {
                const node = discQ.shift();
                if (node.left) discQ.push(node.left);
                if (node.right) discQ.push(node.right);
                out.push(node.data);
                if (cb) cb(node);
            }
        }

        return out;
    }

    // TODO: brain won't do it, stuck with iterative
    levelOrderRecurse(cb) {}

    // Left, Root, Right
    inorder(cb = null, node = this.root, out = []) {
        if (node === null) return out;

        if (node.left) this.inorder(cb, node.left, out);
        out.push(node.data);
        if (node.right) this.inorder(cb, node.right, out);

        return out;
    }

    // Root, Left, Right
    preorder(cb = null, node = this.root, out = []) {
        if (node === null) return out;

        out.push(node.data);
        if (node.left) this.preorder(cb, node.left, out);
        if (node.right) this.preorder(cb, node.right, out);

        return out;
    }

    // Left, Right, Root
    postorder(cb = null, node = this.root, out = []) {
        if (node === null) return out;

        if (node.left) this.postorder(cb, node.left, out);
        if (node.right) this.postorder(cb, node.right, out);
        out.push(node.data);

        return out;
    }

    height(node = this.root) {
        if (node === null) return -1;

        const left = this.height(node.left);
        const right = this.height(node.right);

        return Math.max(left, right) + 1;
    }

    depth(node) {
        let test = this.root;
        const value = node.data;
        let count = 0;

        while (test) {
            if (test.data === value) break;
            test = nextNode(test, value);
            count++;
        }

        return count;
    }

    isBalanced(node = this.root) {
        const left = this.height(node.left);
        const right = this.height(node.right);
        const diff = Math.abs(left - right);

        return diff <= 1;
    }

    rebalance() {
        // TODO: i doubt the intention was to double the memory
        // probably suposed to reuse existing nodes by traversing the 
        // same order and overwrite with values in the array
        this.root = buildTree(this.levelOrderIterative());
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}

// TODO: don't know if this is good or bad
// these utility functions are specific to the class,
// but do not use the state at all; are basicaly pure functions
// I hate the stupid #method() and this.#method() syntax
function nextNode(node, value) {
    if (value < node.data) return node.left;
    if (value > node.data) return node.right;
}

function isChild(parent, value) {
    return value === parent.left?.data || value === parent.right?.data;
}

function isLeaf(node) {
    return node.left === null && node.right === null;
}

function buildTree(arr = []) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid + 1);

    node.left = buildTree(leftArr);
    node.right = buildTree(rightArr);

    return node;
}

function appendLeaf(curNode, newNode) {
    // ignore duplicate
    if (newNode.data === curNode.data) return;

    // when leaf found, do insert
    if (newNode.data < curNode.data) {
        if (curNode.left) appendLeaf(curNode.left, newNode);
        else curNode.left = newNode;
    } else if (newNode.data > curNode.data) {
        if (curNode.right) appendLeaf(curNode.right, newNode);
        else curNode.right = newNode;
    }
}

function deleteChild(parent, value) {
    const node = nextNode(parent, value);

    if (isChild(parent, value)) {
        if (parent.left === node) parent.left = deleteNode(node, value);
        if (parent.right === node) parent.right = deleteNode(node, value);
        return;
    }

    deleteChild(node, value);
}

function deleteNode(node) {
    if (isLeaf(node)) return null;

    // node with two children
    // find smallest larger node and rewire stuff
    if (node.left && node.right) {
        let bigger = node.right;
        let smallest = bigger;

        while (smallest.left) {
            bigger = smallest;
            smallest = smallest.left;
        }

        node.data = smallest.data;
        bigger.left = null; // this is incase it right sub-tree is a leaf
        if (bigger !== smallest) bigger.left = smallest.right;

        return node;
    }

    // node with single child
    if (node.left) return node.left;
    if (node.right) return node.right;
}

export { Tree };
