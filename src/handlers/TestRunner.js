module.exports = {
    run: function(message, expected, method, actual) {
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
    }
};