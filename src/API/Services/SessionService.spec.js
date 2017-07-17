const assert = require("assert"),
      TestRunner = require("../../Utils/TestRunner"),
      SessionService = require("./SessionService"),
      CryptKeeper = require("../../Utils/CryptKeeper"),
      mockFs = require("../../../_mocks/MockFileSystem");

TestRunner.setContext("Sessions");

let cryptKeeper = new CryptKeeper(),
    session = new SessionService(mockFs);

cryptKeeper.encrypt("adamski", "adamski", (err, cipherUsername) => {
    session.create(cipherUsername, (err, sessionKey) => {
        TestRunner.run("Should create a 254 char session key/store", sessionKey.length, assert.strictEqual, 254);

        mockFs.readFile("doesntmatter", "doesntmatter", (err, writtenData) => {
            TestRunner.run("Should put the cipher username in the session store", writtenData, assert.strictEqual, cipherUsername);
        });
    });
});