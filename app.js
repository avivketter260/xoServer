let boardService = require('./data-access/boardService.js');
let menu = require('./user-interface/menus.js');
let gameDynamics = require('./logic/gameDynamics.js');
const boardUI = require('./user-interface/board.js');
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


            stepTurn(board, stepTurn);
        });
    }
});
let turn = 0
// put in gamedyn ---->  /// not sure how...
const stepTurn = function (board, callback) {
    let sign = turn % 2 == 0 ? 'X' : 'O';
    boardUI.print(board)
    menu.userMove(sign, function (x, y, err) {
        if (err) console.error(err);

        if (!gameDynamics.isValidMove(board, x, y)) {
            console.log('not valid move please try agin');
            return callback(board, stepTurn)
        }

        board[y][x] = sign;
        turn++;


        // put in gameDyn insted win

        if (gameDynamics.isWin(board, sign)) {
            console.log(`GAME OVER.`)
            console.log(` ${sign} symbol win!`)
            boardUI.print(board);
            board = boardService.makeEmptyBoard()
            
            boardService.saveBoard(board, function (err) {
                if (err) return console.log(err); // if undefined
                console.log('cleaning board ... ')
            });

            menu.isRestart(function (err, restart) {
                if (restart) {
                    callback(board, stepTurn);
                }
            })
        } else {

            boardService.saveBoard(board, function (err) {
                if (err) return console.log(err); // if undefined

                console.log("The file was saved! now we can load");
                callback(board, stepTurn);
            });
        }

    });
}






