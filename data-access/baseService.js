const fs = require('fs');


// polymorphism: data can board or history or anything that is saveable or loadable

module.exports.load = function (filename) {
    return new Promise(function (res, rej) {
        fs.readFile(`./${filename}`, function (err, data) {
            if (!err) {
                try {
                    data = JSON.parse(data); // Serialization / deserialization 
                } catch (err) {
                    rej(err) // reject parse error
                }
                res(data);
            } else {
                rej(err);
            }
        });
    })
}



module.exports.save = function (filename, data) {
    return new Promise(function (res, rej) {
        const json = JSON.stringify(data);
        fs.writeFile(`./${filename}`, json, function (err) {
            if (err) return rej(err);
            res();
        });
    })
}