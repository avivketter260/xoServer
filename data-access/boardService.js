const fs = require('fs');
const filename = "saved-game.txt"


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


module.exports.saveBoard = function (board, callback) {
    const json = JSON.stringify(board);
    fs.writeFile(`./${filename}`, json, callback);
}

// assigning (defining) a method on property named 'loadBoard' of object exports. 
module.exports.loadBoard = function (callback) {
    fs.readFile(`./${filename}`, function (err, board) {
        if (!err) {
            board = JSON.parse(board); // Serialization / deserialization 
        }
        callback(err, board);

     
    });
}








