// let localModule = require('./local-module.js');
let boardService = require('./data-access/boardService.js');
// boardService.makeEmptyBoard();
let menu = require('./user-interface/menus.js');
let win = require('./logic/xoLogic.js');
// let getUserMove = require('./user-interface/getUserMove.js');
// callbeck hell


boardService.loadBoard(function (err, loadedBoard) { // It is widely accepted that first parameter of callbacks id optional error
    let board;
    if (err) { // if undifined
        board = boardService.makeEmptyBoard();
    } else {
        menu.isLoadGame(function (err, requsetLoad) {
            if (requsetLoad) {
                board = loadedBoard;
                console.log(`the file wad loaded! now we can save`);
            } else {
                board = boardService.makeEmptyBoard();
                console.log(`new game`);
            }
            // most important: menu.getUserMove

            // todo: calc turn from loaded board

            gameLoop(board, gameLoop);
        });
    }
});

let turn = 0
const gameLoop = function (board, callback) {
    let LENGTH = board.length
    let sign = turn % 2 == 0 ? 'X' : 'O';
    menu.userMove(sign, function (x, y, err) {
        if (err) console.error(err);
    
        if (board[x][y] === '') {
            board[x][y] = sign;
            turn++;
         
        } else {
            console.log('not valid move mate try agin');
        }
        // todo: check possible move-dobe, check win - done, restart?-done

        boardService.saveBoard(board, function (err) {
            if (err) return console.log(err); // if undefined

            console.log("The file was saved! now we can load");
            console.table(board);
            if (win.isWin(board, sign)) {
                console.log(`GAME OVER.`)
                console.log(` ${sign} symbol win!`)
                menu.isRestart(function (err, restart) {
                    if (restart) {
                        board = boardService.makeEmptyBoard()
                        console.table(board);
                        callback(board, gameLoop);

                    }

                })
            } else
                callback(board, gameLoop);
        });
    });
}


// load, change (put x / o in some empty location) & save, console.table

    // NOTE!!!! dont chnage any method in boardService, they are perfect



