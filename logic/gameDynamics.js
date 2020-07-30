
const LENGTH = 3;

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




module.exports.isValidMove = function (board, x, y) {
    // TODO: check that x and y are numbers.

    if (x < 0 || y < 0){
        return false; 
    }

    if (x >= board.length || y >= board.length  ){
        return false;
    }
    
    if (board[y][x] !== '') {
        return false;
    }

    return true;
}


