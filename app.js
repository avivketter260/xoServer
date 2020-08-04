let boardService = require('./data-access/boardService.js');
let menu = require('./user-interface/menus.js');
let gameDynamics = require('./logic/gameDynamics.js');
const boardUI = require('./user-interface/board.js');
let board;
// // callbeck hell
(async function () {
    await boardService.loadBoard();
    if (undefined) {
        board = boardService.makeEmptyBoard();
    } else {
        const answer = await menu.isLoadGame()
        if (answer) {
            const board = await boardService.loadBoard()
            boardUI.print(board);
            console.log(`the file wad loaded! now we can save`);
        } else {
            board = boardService.makeEmptyBoard();
            console.log('NEW GAME');

        }
        // stepTurn(board, stepTurn);
    }
    let turn = 0;
    let sign;
    const win = gameDynamics.isWin(board, sign)
    while (!win) {
        sign = turn % 2 == 0 ? 'X' : 'O';
        boardUI.print(board)
        console.log(`its ${sign} turn`);
        let userInput = await menu.userMove();
        let x = [userInput[0]];
        let y = [userInput[1]];
        // const stepTurn = function (board) {

        while (!gameDynamics.isValidMove(board, x, y)) {
            console.log('not valid move please try agin');
            userInput = await menu.userMove();
            x = [userInput[0]];
            y = [userInput[1]];
        }


        board[y][x] = sign;
        turn++;

        if (gameDynamics.isWin(board, sign)) {
            console.log(`GAME OVER.`)
            console.log(` ${sign} symbol win!`)
            boardUI.print(board);
            board = boardService.makeEmptyBoard();


            boardService.saveBoard(board);
            console.log('cleaning board ... ')

            const restart = await menu.isRestart()
            if (restart) {
                //????????????
            }

        } else {

            await boardService.saveBoard(board);
            console.log("The file was saved! now we can load");
        }



    }


})().then(() => { });


// (async function main() {
//     const board = await menu.userMove();
//     console.log([board[0]])
//     console.log([board[1]])

// })().then(() => { });

/// check Promise : 
// save, load work 
// is restart work 
// user move work 
// is load game work 