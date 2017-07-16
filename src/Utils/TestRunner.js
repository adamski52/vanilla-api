let beforeEachCallback = () => {},
    context = "";

function getMessage(message) {
    return context + " :: " + message;
}


module.exports = {
    setContext: function(ctx) {
        context = ctx;
    },
    run: function(message, actual, method, expected) {
        try {
            method(expected, actual);
            console.log("PASS: " + getMessage(message));
        }
        catch(e) {
            console.error("FAIL: " + getMessage(message));
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