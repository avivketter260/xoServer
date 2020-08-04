const prompt = require('prompt');
// let boardService = require('./data-access/boardService.js');


module.exports.isLoadGame = function () {
    return new Promise(function (res, rej) {
        console.log('It seems that there is a game unfinished.\n ' +
            'would you like to continue (yes/y)?')
        prompt.start();
        prompt.get([`load`], function (err, result) {
            if (err) return rej(err);

            result.load = result.load.toLowerCase();

            // fallback (default)
            // let isLoad = false;
            let isLoad = false
            if (result.load === 'yes' || result.load === 'y') {
                isLoad = true;
            }

            res(isLoad)
        });
    })

}

// let boardService = require('./data-access/boardService.js');

module.exports.userMove = function () {
    return new Promise(function (res, rej) {
        prompt.start();
        prompt.get(['whereCol'], function (err, colLocation) {
            if (err) return rej(err);
            console.log(`you chose to put in col num : ${colLocation.whereCol}`);
            // console.log(`you chose to put in col num : ${colLocation}`);
            prompt.start();
            prompt.get(['whereRow'], function (err, rowLocation) {
                if (err) console.error(err);
                console.log(`you chose to put in row num : ${rowLocation.whereRow}`);

                res([colLocation.whereCol, rowLocation.whereRow])
            });
        })
    })

}
// this function work well 
module.exports.isRestart = function () {
    return new Promise(function (res, rej) {
        console.log('Restart game? yes/y');
        prompt.start();
        prompt.get(['restart'], function (err, result) {
            if (err) return rej(err);

            result.restart = result.restart.toLowerCase();
            let iWantToRest = false
            if (result.restart === 'yes' || result.restart === 'y') {
                iWantToRest = true
            }
            res(iWantToRest);
        });
    })

}