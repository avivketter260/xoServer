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
            console.log(`the file wad loaded! now we can save`);
            boardUI.print(board)
        } else {
            board = boardService.makeEmptyBoard();
            console.log('NEW GAME');

        }
        // stepTurn(board, stepTurn);
    }
    let turn = 0;
    let sign;
const notWin = gameDynamics.isWin(board,sign)
while(!notWin) {
    sign = turn % 2 == 0 ? 'X' : 'O';
    boardUI.print(board)
    let userInput = await menu.userMove();
    let x =[userInput[0]];
    let y =[userInput[1]];
        // const stepTurn = function (board) {
            if (!gameDynamics.isValidMove(board, x, y)) {
                console.log('not valid move please try agin');
                // return stepTurn(board, stepTurn)
            }


            board[y][x] = sign;
            turn++;
        }
            if (gameDynamics.isWin(board, sign)) {
                console.log(`GAME OVER.`)
                console.log(` ${sign} symbol win!`)
                boardUI.print(board);
                board = boardService.makeEmptyBoard();


                boardService.saveBoard(board);
                console.log('cleaning board ... ')

                const restart = await menu.isRestart()
                if (restart) {
                    
                }

            } else {

               await boardService.saveBoard(board);
                console.log("The file was saved! now we can load");
                // stepTurn(board, stepTurn);
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