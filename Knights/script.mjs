"use strict";

import { Square, Point } from "./Square.mjs";

const cl = console.log;

const LEN = 8;
const board = new Array(LEN);

function doStuff() {
    console.clear();

    createBoard();
    printBoard();
    printMoves();

    let squares = [];
    // knightMoves([3, 3], [4, 3]);
    squares = knightMoves([0, 0], [1, 2]);
    cl(squares.map((sq) => sq.name).join("->"));
    // squares = knightMoves([0, 0], [3, 3]);
    // cl(
    //     squares.reduce((p, c) => p + c.name + "->"),
    //     ""
    // );
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

// TODO: i'm too stupid to make this suck less
// on second thought, i kind of like the simplicity;
// define the 8 moves, then flilter out invalid
function defineMoves(start = [0, 0]) {
    const moves = [];
    const startPoint = new Point(start[0], start[1]);

    moves.push(new Point(startPoint.x - 1, startPoint.y + 2));
    moves.push(new Point(startPoint.x - 1, startPoint.y - 2));
    moves.push(new Point(startPoint.x + 1, startPoint.y + 2));
    moves.push(new Point(startPoint.x + 1, startPoint.y - 2));
    moves.push(new Point(startPoint.x - 2, startPoint.y + 1));
    moves.push(new Point(startPoint.x - 2, startPoint.y - 1));
    moves.push(new Point(startPoint.x + 2, startPoint.y + 1));
    moves.push(new Point(startPoint.x + 2, startPoint.y - 1));

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

// TODO: first pass, full bfs ignoring end
function knightMoves(start = [0, 0], end = [1, 2]) {
    const out = [];
    const discQ = [];
    const visited = {};
    const startSquare = getSquare(start[0], start[1]);
    const endSquare = getSquare(end[0], end[1]);

    discQ.push(startSquare);
    // TODO: referance material used this approach
    // I don't like using object this way
    // probably want to define a Map()
    visited[startSquare.name] = true;

    while (discQ.length > 0) {
        const currSquare = discQ.shift();
        out.push(currSquare);

        currSquare.moves.forEach((point) => {
            const moveSquare = getSquare(point.x, point.y);
            if (!visited[moveSquare.name]) {
                visited[moveSquare.name] = true;
                discQ.push(moveSquare);
            }
        });
    }

    return out;
}

function getSquare(x, y) {
    return board[x][y];
}

function isInMoves(startPoint, endPoint) {
    return board[startPoint.x][startPoint.y].moves.some((move) =>
        endPoint.isEqual(move)
    );
}

doStuff();
