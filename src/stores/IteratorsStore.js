let ss,
    file = "_secure/stores/iterators.json";

class IteratorsStore {
    constructor(StoreSystem = require("../helpers/StoreSystem"),
                fs = require("fs")) {

        ss = new StoreSystem(fs);
    }

    getIterator(callback) {
        ss.read(file, (err, data) => {
            if(err) {
                callback(err, undefined);
                return;
            }

            data = JSON.parse(data);

            data.GLOBAL.current += data.GLOBAL.delta;

            ss.write(file, data, (err, data) => {
                if(err) {
                    callback(err, undefined);
                    return;
                }

                callback(undefined, data.GLOBAL.current);
            });
        });
    }
}

module.exports = IteratorsStore;
