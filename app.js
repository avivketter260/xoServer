"use strict";
// const menu = require('./user-interface/menus.js');
// const gameDynamics = require('./logic/gameDynamics.js');
const server = require ('./user-interface/server.js');
server.startListenUserMove();

// (async function () {
//     let restart = true;
//     let board;
//     board = await menu.loadOrNewGame();
//     while (restart) {
//         board = await gameDynamics.gameInAction(board); // TODO: send board, but send to me before to investigat the globallity of board
//         restart = await menu.isRestart();
//     }
//     console.log('Thank you for play !');

// })().then(() => { });

