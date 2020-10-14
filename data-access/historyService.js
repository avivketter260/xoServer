const baseService = require('./baseService.js');
const filename = "saved-history.txt"

// unpure
module.exports.save = function (history) {
    return baseService.save(filename, history)
}
// unpure
module.exports.load = function () {
    return baseService.load(filename);
}