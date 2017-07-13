let fs;

class StoreSystem {
    constructor(_fs = require("fs")) {
        fs = _fs;
    }

    read(file, callback) {
        fs.readFile(file, (err, data) => {
            if(err) {
                throw err;
            }

            callback(JSON.parse(data));
        });
    }

    write(file, element, callback = () => {}) {
        this.read(file, (data) => {
            let newData = Object.assign({}, data, element);
            fs.writeFile(file, JSON.stringify(newData), (err) => {
                if (err) {
                    throw err;
                }

                callback(newData);
            });
        });
    }
}

module.exports = StoreSystem;