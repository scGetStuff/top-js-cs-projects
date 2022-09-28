'use strict';

console.clear();
const cl = console.log;

function merge(arr = []) {
    if (arr.length < 2) return arr;

    const half = Math.floor(arr.length / 2);
    const left = merge(arr.slice(0, half));
    const right = merge(arr.slice(half));
    // TODO: maybe a good excercise to use arr and do it in place, better memory
    const out = [];

    let j = 0;
    for (let i = 0; i < left.length; i++) {
        // push all smaller values from right
        while (left[i] > right[j]) out.push(right[j++]);
        out.push(left[i]);
    }
    // if array was sorted, right was not pushed
    while (j < right.length) out.push(right[j++]);

    return out;
}

cl(merge([5, 2, 1, 3, 6, 4]));
cl(merge([1, 3]));
cl(merge([3, 1]));
cl(merge([1]));
