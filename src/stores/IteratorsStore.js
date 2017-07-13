let fs,
    _file = "_secure/stores/iterators.json";

function read(callback) {
    fs.readFile(_file, (err, data) => {
        if(err) {
            throw err;
        }

        callback(JSON.parse(data));
    });
}

function write(element, callback = () => {}) {
    read((data) => {
        let newData = Object.assign({}, data, element);
        fs.writeFile(_file, JSON.stringify(newData), (err) => {
            if (err) {
                throw err;
            }

            callback(newData);
        });
    });
}

class IteratorsStore {
    constructor(_fs) {
        fs = _fs;
    }
    getIterator(callback) {
        read((data) => {
            data.GLOBAL.current += data.GLOBAL.delta;

            write(data, () => {
                callback(data.GLOBAL.current);
            });
        });
    }
}


module.exports = IteratorsStore;
