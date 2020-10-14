"use strict";
const gameDynamics = require('../logic/gameDynamics.js');
const historyManager = require('../logic/historyManager.js')
const boardService = require('../data-access/boardService.js');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
// Note: adds header "access-control-allow-origin: *"

let board = undefined;
let turn = 0;
let sign = 'X';

//Todo : make a new route for restart 
//Todo : make a new route for load gmae 

// not sure if need to stay in promise or not


// TODO: server should be minimal of logic
module.exports.startListenUserMove = function () {

    app.listen(3000);
    console.log('listening...');
    app.get('/user-move', function (req, res) {

        if (!('x' in req.query) || !('y' in req.query)) {
            res.status(400);
            return res.send({ error: 'something went worng please try again' });
            // maybe return not necessary 
        }
        const x = Number(req.query.x), y = Number(req.query.y);

        if (!board) {
            board = boardService.makeEmptyBoard()
            turn = 0;
        }

        if (!gameDynamics.isValidMove(board, x, y)) {
            // todo uncomment this and fix it in the clinet side.
            res.staכtus(400);
            return res.send({
                status: 'bad move',
                sign: sign,
                board: board,

            })
        }

        // TODO: everything after here should be in logic

        sign = turn % 2 == 0 ? 'X' : 'O';
        board[y][x] = sign;
        turn++;
        const boardLeangth = board.length * board[0].length;

        if (turn === boardLeangth) {
            res.send({
                status: 'tie',
                sign: sign,
                board: board
            })
            return board = undefined;
        }
        if (gameDynamics.isWin(board, sign)) {
            res.send({
                status: 'win',
                sign: sign,
                board: board
            })

            board = undefined;

            return;
        }

        // Promise is a class, return new Promise stands for object. 
        const saveBoardPromise = boardService.saveBoard(board);
        const addMoveHistory = historyManager.addMove(x, y);
        const loadHistoryMove = historyManager.upLoadMove(board)
        const asyncStuff = Promise.all([saveBoardPromise, addMoveHistory, loadHistoryMove]);

        return asyncStuff.then(function () {
            res.status(200);
            res.send({
                status: 'during..',
                sign: sign,
                board: board
            });
        }).catch(function () {
            // TODO: let the client know that save is interupted
            res.status(500);
            res.send({
                status: 'save is interupted',
                sign: sign,
                board: board
            });
        })
        // 2 problems: 1 if board save fails then it will not even try to save history
        // 2: in case of fail the server does not respond
        // TODO: we need to implement .catch

    })

}

