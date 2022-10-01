import { Node } from './Node.mjs';

const cl = console.log;

class Tree {
    constructor(arr = []) {
        const set = new Set(arr.sort());
        this.root = this.buildTree(Array.from(set));
    }

    buildTree(arr = []) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const node = new Node(arr[mid]);
        const leftArr = arr.slice(0, mid);
        const rightArr = arr.slice(mid + 1);

        node.left = this.buildTree(leftArr);
        node.right = this.buildTree(rightArr);

        return node;
    }

    dump(node = this.root) {
        if (node == null) return;

        cl('\n');
        cl(node.data);
        cl(`${node.left}\t${node.right}`);
        this.dump(node.left);
        this.dump(node.right);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    }
}

export { Tree };
