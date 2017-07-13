let beforeEachCallback = () => {};

module.exports = {

    run: function(message, actual, method, expected) {
        try {
            method(expected, actual);
            console.log("PASS: " + message);
        }
        catch(e) {
            console.error("FAIL: " + message);
            console.error("   Expected: " + expected.toString());
            console.error("   Got: " + actual.toString());
        }

        console.log("");

        beforeEachCallback();
    },

    beforeEach: function(callback) {
        beforeEachCallback = callback;
        callback();
    }
};