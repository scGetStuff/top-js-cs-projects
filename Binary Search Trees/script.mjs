"use strict";

import { Tree } from "./Tree.mjs";

console.clear();
const cl = console.log;

function doStuff() {
    // Tie it all together
    // I'm not doing a random generator thing, don't care, sick of working on this
    // Been planing to do a full DSA course anyway, cover it more there
    if (true) {
        const tree = new Tree([10, 20, 30, 100, 150, 200, 300]);
        tree.prettyPrint();
        cl("isBalanced : " + tree.isBalanced());
        cl(tree.levelOrderIterative());
        cl(tree.preorder());
        cl(tree.postorder());
        cl(tree.inorder());
        tree.insert(400);
        tree.insert(500);
        tree.insert(600);
        tree.prettyPrint();
        cl("isBalanced : " + tree.isBalanced());
        tree.rebalance();
        tree.prettyPrint();
        cl("isBalanced : " + tree.isBalanced());
        cl(tree.levelOrderIterative());
        cl(tree.preorder());
        cl(tree.postorder());
        cl(tree.inorder());
    }

    if (false) {
        const tree = new Tree([10, 20, 30, 100, 150, 200, 300]);
        tree.prettyPrint();
        cl(tree.inorder());
        cl(tree.preorder());
        cl(tree.postorder());
    }

    if (false) {
        const tree = new Tree([1, 2, 3, 4, 5]);
        tree.insert(6);
        tree.insert(7);
        tree.insert(8);
        tree.prettyPrint();
        cl("isBalanced : " + tree.isBalanced());
    }

    if (false) {
        const tree = new Tree([
            1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
        ]);
        tree.prettyPrint();
    }

    if (false) {
        const tree = new Tree([1, 2, 3, 4, 5]);
        // tree.insert(7);
        tree.prettyPrint();
        // cl(tree.find(3)?.toString());
        // tree.delete(3);
        // tree.prettyPrint();
        cl(tree.levelOrderIterative(cb));
        cl(tree.levelOrderRecurse(cb));
        cl(tree.height(tree.root));
        cl(tree.depth(tree.root.right));
        tree.prettyPrint();
    }
}

function cb(node) {
    // cl(node.data);
}

doStuff();
