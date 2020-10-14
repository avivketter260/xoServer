const historyService = require('../data-access/historyService.js')
let history = [];
exports.addMove = async function (x, y) {
    history.push({
        x: x,
        y: y
    });
    return await historyService.save(history)
    
}

exports.upLoadMove = async function (history){
    return console.log(await historyService.load(history));
}