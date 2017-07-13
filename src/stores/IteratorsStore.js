let ss,
    file = "_secure/stores/iterators.json";

class IteratorsStore {
    constructor(StoreSystem = require("../helpers/StoreSystem"),
                fs = require("fs")) {

        ss = new StoreSystem(fs);
    }

    getIterator(callback) {
        ss.read(file, (data) => {
            data.GLOBAL.current += data.GLOBAL.delta;

            ss.write(file, data, () => {
                callback(data.GLOBAL.current);
            });
        });
    }
}

module.exports = IteratorsStore;
