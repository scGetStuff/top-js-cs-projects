'use strict';

import { LinkedList } from './LinkedList.mjs';

console.clear();
const cl = console.log;

function doStuff() {
    
    const list = new LinkedList();
    // cl(list.toString());

   
    list.append(1);
    list.append(2);
    list.append(3);
    cl(list.toString());

    // list.insertAt(2.5, 2);
    list.removeAt(3);

    cl(list.toString());



    // cl(list.contains(2));
    // cl(list.find(2));

    // cl(list.at(0));
    // cl(list.at(1));
    // cl(list.at(3));
    // cl(list.at(11));

    // list.pop();
    // list.pop();
    // list.pop();
    // cl(list.toString());

    // list.prepend(6);
    // list.prepend(7);
    // list.prepend(8);
    // cl(list.toString());

}

doStuff();
