"use strict";

import { Tree } from "./Tree.mjs";

console.clear();
const cl = console.log;

function doStuff() {
    {
        const tree = new Tree([
            1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
        ]);
        // tree.prettyPrint();
    }
    {
        const tree = new Tree([1, 2, 3, 4, 5]);
        // tree.insert(7);
        tree.prettyPrint();
        // cl(tree.find(3)?.toString());
        tree.delete(1);
        tree.prettyPrint();
    }


}

doStuff();
