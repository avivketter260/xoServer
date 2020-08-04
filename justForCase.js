  await boardService.loadBoard(loadedBoard)  // It is widely accepted that first parameter of callbacks id optional error
        let board;
        if (err) { // if undifined
            board = boardService.makeEmptyBoard();
        } else {
            // await menu.isLoadGame(requsetLoad)
            if (requsetLoad) {
                board = loadedBoard;
                console.log(`the file wad loaded! now we can save`);
            } else {
                board = boardService.makeEmptyBoard();
                console.log(`new game`);
            }
            stepTurn(board, stepTurn);
        }
    }
    );
    let turn = 0
    // put in gamedyn ---->  /// not sure how...
    const stepTurn = function (board) {
        let sign = turn % 2 == 0 ? 'X' : 'O';
        boardUI.print(board)
        menu.userMove(sign, function (x, y, err) {
            if (err) console.error(err);

            if (!gameDynamics.isValidMove(board, x, y)) {
                console.log('not valid move please try agin');
                return stepTurn (board, stepTurn)
            }

            board[y][x] = sign;
            turn++;


            // put in gameDyn insted win

            if (gameDynamics.isWin(board, sign)) {
                console.log(`GAME OVER.`)
                console.log(` ${sign} symbol win!`)
                boardUI.print(board);
                board = boardService.makeEmptyBoard()

                // await boardService.saveBoard(board);
                console.log('cleaning board ... ')

                menu.isRestart(function (err, restart) {
                    if (restart) {
                        callback(board, stepTurn);
                    }
                })
            } else {

                // await boardService.saveBoard(board);
                console.log("The file was saved! now we can load");
                stepTurn(board, stepTurn);
            }
        });
    }
