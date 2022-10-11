import { Node } from "./Node.mjs";

const cl = console.log;

class Tree {
    constructor(arr = []) {
        arr = Array.from(new Set(arr));
        arr.sort((a, b) => a - b);
        this.root = buildTree(arr);
    }

    insert(value) {
        const newNode = new Node(value);
        appendLeaf(this.root, newNode);
    }

    delete(value) {
        // TODO: root
        if (this.root.data === value) return;

        let parent = this.root;

        // find the parent node
        while (parent) {
            if (isChild(parent, value)) break;
            parent = nextNode(parent, value);
        }
        if (!parent) return;

        // TODO: first pass, dumb delete, add real cases
        if (parent.left?.data === value) parent.left = null;
        if (parent.right?.data === value) parent.right = null;
    }

    find(value) {
        let node = this.root;

        while (node) {
            if (node.data === value) break;
            node = nextNode(node, value);
        }
        return node;
    }

    levelOrder() {}

    inorder() {}

    preorder() {}

    postorder() {}

    height() {}

    depth() {}

    isBalanced() {}

    rebalance() {}

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

export { Tree };
