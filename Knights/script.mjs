"use strict";

import { Square, Point } from "./Square.mjs";

const cl = console.log;

const LEN = 8;
const board = new Array(LEN);

function doStuff() {
    console.clear();

    createBoard();
    cl("\rVertices");
    printBoard();
    cl("\rEdges");
    printMoves();

    let squares = [];
    squares = bfs([0, 0]);
    cl("\rBFS [0,0]");
    cl(squares.map((sq) => sq.name).join("->"));

    squares = knightMoves([0, 0], [5, 7]);
    squares = knightMoves([3, 3], [4, 3]);
    squares = knightMoves([0, 0], [1, 2]);
    squares = knightMoves([0, 0], [3, 3]);
    squares = knightMoves([3, 3], [0, 0]);
}

// the board is an Adjacency List as a 2D array
function createBoard() {
    for (let i = 0; i < LEN; i++) {
        board[i] = new Array(LEN);
        for (let j = 0; j < LEN; j++) {
            const node = new Square(
                i,
                j,
                `${i + 1}${String.fromCharCode(65 + j)}`
            );
            node.moves = defineMoves([i, j]);
            board[i][j] = node;
        }
    }
    return board;
}

// at first i wanted to make this suck less
// on second thought, i kind of like the simplicity;
// define the 8 moves, then flilter out invalid
function defineMoves(start = [0, 0]) {
    const moves = [];
    const x = start[0];
    const y = start[1];

    moves.push(new Point(x - 1, y + 2));
    moves.push(new Point(x - 1, y - 2));
    moves.push(new Point(x + 1, y + 2));
    moves.push(new Point(x + 1, y - 2));
    moves.push(new Point(x - 2, y + 1));
    moves.push(new Point(x - 2, y - 1));
    moves.push(new Point(x + 2, y + 1));
    moves.push(new Point(x + 2, y - 1));

    return moves.filter(
        (move) => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8
    );
}

function printBoard() {
    let line;
    for (let i = LEN - 1; i >= 0; i--) {
        line = "";
        for (let j = 0; j < LEN; j++) {
            line += board[i][j].name + "  ";
        }
        cl(line);
    }
    cl("");
}

function printMoves() {
    let line;
    for (let i = LEN - 1; i >= 0; i--) {
        for (let j = 0; j < LEN; j++) {
            line = board[i][j].name + " ";
            board[i][j].moves.forEach((point) => (line += point));
            cl(line);
        }
    }
    cl("");
}

// i had to look at other code to get the whole parents idea
// i was stuck at having all the pieces defined and bfs,
// but couldn't figure the path part
function knightMoves(start = [0, 0], end = [1, 2]) {
    const discQ = [];
    const visited = new Set();
    const startSquare = getSquare(start[0], start[1]);
    const endSquare = getSquare(end[0], end[1]);
    const paths = [];

    // not making a class, object literal { square, path }
    discQ.push({ square: startSquare, path: [startSquare] });

    while (discQ.length > 0) {
        const { square: currSquare, path } = discQ.shift();
        visited.add(currSquare.name);

        // any path that reaches end, gets recorded
        if (currSquare.address.isEqual(endSquare.address)) {
            paths.push(path);
        }

        currSquare.moves.forEach((point) => {
            const moveSquare = getSquare(point.x, point.y);
            if (!visited.has(moveSquare.name)) {
                discQ.push({
                    square: moveSquare,
                    path: [...path, moveSquare],
                });
            }
        });
    }

    // cl(`\nAll paths from ${startSquare.address} to ${endSquare.address}`);
    cl(`\nAll paths from ${startSquare} to ${endSquare}`);
    paths.forEach((path) => {
        let line = "";
        path.forEach((square) => {
            // line += square.address;
            line += square;
        });
        cl(line);
    });
}

function bfs(start = [0, 0]) {
    const out = [];
    const discQ = [];
    const visited = new Set();
    const startSquare = getSquare(start[0], start[1]);

    discQ.push(startSquare);

    while (discQ.length > 0) {
        const currSquare = discQ.shift();
        visited.add(currSquare.name);
        out.push(currSquare);

        currSquare.moves.forEach((point) => {
            const moveSquare = getSquare(point.x, point.y);
            if (!visited.has(moveSquare.name)) {
                visited.add(moveSquare.name);
                discQ.push(moveSquare);
            }
        });
    }

    return out;
}

function getSquare(x, y) {
    return board[x][y];
}

doStuff();
