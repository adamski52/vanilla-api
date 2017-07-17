const assert = require("assert"),
      TestRunner = require("../../Utils/TestRunner"),
      Session = require("./Session"),
      CryptKeeper = require("../../Utils/CryptKeeper");

TestRunner.setContext("Sessions");

let writtenData,
    mockFs = {
        existsSync: function(filename) {
            return false;
        },
        writeFile: function() {}
    },
    cryptKeeper = new CryptKeeper(),
    session = new Session(mockFs);


cryptKeeper.encrypt("adamski", "adamski", (err, cipherUsername) => {
    session.create(cipherUsername, (err, sessionKey) => {
        TestRunner.run("Should create a 254 char session key/store", sessionKey.length, assert.strictEqual, 254);
        TestRunner.run("Should put the cipher username in the session store", writtenData, assert.strictEqual, cipherUsername);
    });
});