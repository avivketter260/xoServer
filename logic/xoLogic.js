

// // const fs = require('fs');
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

// let USERSYMBOL = {
//     x: 'X',
//     o: 'O'
// };
// playerXMove = true;
// module.exports.userStart = whoStart

// let whoStart = ()=>{
// if(Math.random() > 0.5){
//  playerXMove = false;
// }
// }

// const prompt = require('prompt');


// TODO: fill it up

// module.exports.getPos = function (strPos) {
//     idxs = strPos.split(',');
//     return { i: +idxs[0], j: +idxs[1] };
// }

// module.exports.isPossibleMove = function () {
// if (whoStart()){
//     let isVaildMove = false;
//     while (!isVaildMove) {

//         let askUser = prompt.get(['` Where ? , Format use : i , j'], function (err, result) {
//             if (err) {
//                 return onErr(err);
//             }
//             console.log(`${result}`);

//             if (!askUser) return false;
//             let pos = getPos(askUser);

//             if (board[pos.i][pos.j] === '') {
//                 board[pos.i][pos.j] = USERSYMBOL.x
//                 isVaildMove = true;
//             }
//             if (board[pos.i][pos.j] === '') {
//                 board[pos.i][pos.j] = USERSYMBOL.o
//                 isVaildMove = true;
//             }
//         });
//         let currectSymbol = (USERSYMBOL) ? USERSYMBOL.x : USERSYMBOL.o;

//     }


// }
//     return true;
//     // Todo: fill it up
// }

// function onErr(err) {
//     console.log(err);
//     return 1;
// }
