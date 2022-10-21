"use strict";

import { Square, Point } from "./Square.mjs";

console.clear();
const cl = console.log;

const LEN = 8;
const board = new Array(LEN);

function doStuff() {
    createBoard();
    printBoard();
    printMoves();

    // knightMoves([3, 3], [4, 3]);
    knightMoves([0, 0], [1, 2]);
    knightMoves([0, 0], [3, 3]);
}

function isInMoves(startPoint, endPoint) {
    return board[startPoint.x][startPoint.y].moves.some((move) =>
        endPoint.isEqual(move)
    );
}

function knightMoves(start = [0, 0], end = [1, 2]) {
    const out = [];
    const discQ = [];
    const startPoint = new Point(start[0], start[1]);
    const endPoint = new Point(end[0], end[1]);

    // discQ.push(startPoint);

    // out.push(startPoint);
    // while (discQ.length > 0) {
    //     const len = discQ.length;

    //     for (let i = 0; i < len; i++) {
    //         const point = discQ.shift();

    //         // add moves like they were children
    //         const moves = board[point.x][point.y].moves;
    //         moves.forEach((move) => discQ.push(node.left));
    //     }
    // }
    // out.push(endPoint);

    return out;
}

// TODO: i'm too stupid to make this suck less
// on second thought, i kind of like the simplicity;
// define the 8 moves, then flilter out invalid
function defineMoves(start = [0, 0]) {
    const moves = [];
    const point = new Point(start[0], start[1]);

    moves.push(new Point(point.x - 1, point.y + 2));
    moves.push(new Point(point.x - 1, point.y - 2));
    moves.push(new Point(point.x + 1, point.y + 2));
    moves.push(new Point(point.x + 1, point.y - 2));
    moves.push(new Point(point.x - 2, point.y + 1));
    moves.push(new Point(point.x - 2, point.y - 1));
    moves.push(new Point(point.x + 2, point.y + 1));
    moves.push(new Point(point.x + 2, point.y - 1));

    return moves.filter(
        (move) => move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8
    );
}

// the board is an Adjacency List as a 2D array
// using Square to draw the board, but the real graph functionality
// just uses the Points as cordinats on chess board
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

function printBoard() {
    let line;
    for (let i = LEN - 1; i >= 0; i--) {
        line = "";
        for (let j = 0; j < LEN; j++) {
            line += board[i][j].name + "  ";
        }
        cl(line);
    }
    cl("\r");
}

function printMoves() {
    let line;
    for (let i = LEN - 1; i >= 0; i--) {
        for (let j = 0; j < LEN; j++) {
            line = board[i][j].name + " ";
            board[i][j].moves.forEach((point) => (line += point.toString()));
            cl(line);
        }
    }
    cl("\r");
}

doStuff();
