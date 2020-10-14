const { isRestart } = require("../user-interface/menus");
const boardUI = require('../user-interface/board.js');
const menu = require('../user-interface/menus.js');
const boardService = require('../data-access/boardService.js');

const LENGTH = 3;
//pure
module.exports.isWin = function (board, symbol) {
    // let victory = false;
    let countInPrimaryDiagonal = 0;
    let countInSecondaryDiagonal = 0;
    let win;

    for (let x = 0; x < LENGTH; x++) {
        let countRows = 0;
        let countCols = 0;

        if (board[x][x] === symbol) countInPrimaryDiagonal++;
        if (board[x][(LENGTH - 1 /*max index*/) - x] === symbol) countInSecondaryDiagonal++;

        for (let y = 0; y < LENGTH; y++) {
            let tempRows = board[x][y];
            let tempCols = board[y][x];

            if (tempCols === symbol) {
                countCols++;
            }
            if (tempRows === symbol) {
                countRows++;
            }
        }
        if (countRows === LENGTH ||
            countCols === LENGTH ||
            countInPrimaryDiagonal === LENGTH ||
            countInSecondaryDiagonal === LENGTH) {
            win = true;
            return win;
        }
    }
    win = false;
    return win;
}

//pure
module.exports.isValidMove = function (board, x, y) {
    // TODO : commit history in git

    if (isNaN(x) || isNaN(y)) {
        return false
    }

    if (x < 0 || y < 0) {
        return false;
    }

    if (x === '' || y === '') {
        return false;
    }

    if (x >= board.length || y >= board.length) {
        return false;
    }

    if (board[y][x] !== '') {
        return false;
    }

    return true;
}



// not pure (by ref) 
module.exports.gameInAction = async function (board) {
    const gameDynamics = module.exports;
    let turn = 0;
    let sign;
    while (!gameDynamics.isWin(board, sign)) {
        sign = turn % 2 == 0 ? 'X' : 'O';
        boardUI.print(board)
        console.log(`its ${sign} turn`);
        let userInput = await menu.userMove();
        let x = userInput.x;
        let y = userInput.y;

        while (!gameDynamics.isValidMove(board, x, y)) {
            console.log('not valid move please try agin');
            console.log(`its ${sign} turn`);
            userInput = await menu.userMove();
            x = userInput.x;
            y = userInput.y;
        }

        board[y][x] = sign;
        turn++;
        await boardService.saveBoard(board);

    }
    console.log(`GAME OVER.`)
    console.log(` ${sign} symbol win!`)
    boardUI.print(board);
    board = boardService.makeEmptyBoard();
    await boardService.saveBoard(board);
    console.log('cleaning board ... ')
    return board;
}


