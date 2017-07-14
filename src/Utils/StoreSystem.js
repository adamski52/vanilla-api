let fs;

class StoreSystem {
    constructor(_fs = require("fs")) {
        fs = _fs;
    }

    read(file, callback) {
        fs.readFile(file, "utf8", (err, data) => {
            if(err) {
                callback(err, undefined);
                return;
            }

            callback(undefined, data);
        });
    }

    write(file, element, callback = () => {}) {
        this.read(file, (data) => {
            let newData = Object.assign({}, data, element);
            fs.writeFile(file, JSON.stringify(newData), (err) => {
                if (err) {
                    callback(err, undefined);
                    return;
                }

                callback(undefined, newData);
            });
        });
    }
}

module.exports = StoreSystem;