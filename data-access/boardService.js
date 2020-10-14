const fs = require('fs');
const baseService = require('./baseService.js');
const filename = "saved-game.txt"
//pure
module.exports.makeEmptyBoard = function (row, col) {

    if (!row) row = 3;
    if (!col) col = 3;

    let board = [];
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i][j] = '';
        }
    }

    return board;
}

// unpure
module.exports.saveBoard = function (board) {
  return baseService.save(filename, board)
}
// unpure
module.exports.loadBoard = function () { 
    return baseService.load(filename);
}


//pure
module.exports.deleteFile = function () {
    return new Promise(function (res, rej) {
        fs.unlink(filename, function (err) {
            if (err) rej(err)
        })
        res();
    });
}




