'use strict';

console.clear();
const cl = console.log;

function loop(n) {
    if (n <= 1) return [0];

    const arr = new Array(n);
    arr[0] = 0;
    arr[1] = 1;

    for (let i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr;
}

function recurs(n) {
    if (n <= 1) return [0];

    const arr = new Array(n);
    arr[0] = 0;
    arr[1] = 1;

    fib(n);

    return arr;

    function fib(n) {
        if (n === 1 || n === 2) return arr[n - 1];

        arr[n - 1] = fib(n - 1) + fib(n - 2);
        return arr[n - 1];
    }
}

// wanted to get rid of the closure
// arr is an output param, return is not used recursivly, just for the main call
function recurs2(n, arr = []) {
    // base case(s)
    if (n < 3) {
        if (arr.length === 0) arr.push(0);
        if (n === 2 && arr.length === 1) arr.push(1);
        return arr;
    }

    // for new number, cache lower F(n) then add
    if (arr.length <= n) {
        recurs2(n - 1, arr);
        recurs2(n - 2, arr);
        const index = n - 1;
        arr.push(arr[index - 1] + arr[index - 2]);
    }

    return arr;
}

let fibs;
fibs = loop;
fibs = recurs;
fibs = recurs2;

cl(fibs(1));
cl(fibs(2));
cl(fibs(3));
cl(fibs(8));
