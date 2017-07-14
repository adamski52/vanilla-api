let beforeEachCallback = () => {};

module.exports = {

    run: function(message, actual, method, expected) {
        try {
            method(expected, actual);
            console.log("PASS: " + message);
        }
        catch(e) {
            console.error("FAIL: " + message);
            console.error("   Expected: " + expected);
            console.error("   Got: " + actual);
        }

        console.log("");

        beforeEachCallback();
    },

    beforeEach: function(callback) {
        beforeEachCallback = callback;
        callback();
    }
};