let mockData = {};

module.exports = {
    setMockData: function(data) {
        mockData = data;
    },
    readFile: function(file, encoding, callback) {
        callback(undefined, mockData);
    },
    writeFile: function(file, data, callback) {
        mockData = data;

        callback();
    },
    exists: function(file, callback) {
        callback(false);
    },
    existsSync: function() {
        return false;
    }
};