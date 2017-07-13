const assert = require("assert"),
    TestRunner = require("./TestRunner"),
    CryptKeeper = require("./CryptKeeper");


let mockData;
TestRunner.beforeEach(() => {
    mockData = {
        username: "adamski",
        id: 1
    };
})

TestRunner.run("Should make a delicious salted hash", new CryptKeeper().hash("adamski", "adamski"), assert.strictEqual, "73ebfa193babfa8f594fcd9c47d3f9e094b49c91555d219e7399ebaf66d8bed0");
TestRunner.run("Should encrypt a plaintext given value by its salt", new CryptKeeper().encrypt(mockData, "password"), assert.strictEqual, "b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566");
TestRunner.run("Should decrypt a ciphertext given value by its salt", new CryptKeeper().decrypt("b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566", "password"), assert.strictEqual, JSON.stringify(mockData));
TestRunner.run("Should not decrypt a given value by the wrong salt", new CryptKeeper().decrypt("b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566", "secret"), assert.notStrictEqual, JSON.stringify(mockData));

