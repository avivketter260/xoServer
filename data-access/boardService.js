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


module.exports.saveBoard = function (board) {
    return new Promise(function(res, rej) {
        const json = JSON.stringify(board);
        fs.writeFile(`./${filename}`, json, function(err) {
            if(err) rej(err);
            res();
        });
    })
}

// assigning (defining) a method on property named 'loadBoard' of object exports. 
module.exports.loadBoard = function () {
    return new Promise(function (res,rej){
        fs.readFile(`./${filename}`, function (err, board) {
            if (!err) {
                board = JSON.parse(board); // Serialization / deserialization 
                res(board);
            } else {
                rej(err);
            }
        });
    })
}








