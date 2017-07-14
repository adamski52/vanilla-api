const assert = require("assert"),
    TestRunner = require("./../helpers/TestRunner"),
    CryptKeeper = require("./CryptKeeper");


let mockData;
TestRunner.beforeEach(() => {
    mockData = {
        username: "adamski",
        id: 1
    };
})

new CryptKeeper().hash("adamski", "adamski", (err, hash) => {
    TestRunner.run("Should make a delicious salted hash", hash, assert.strictEqual, "73ebfa193babfa8f594fcd9c47d3f9e094b49c91555d219e7399ebaf66d8bed0");
});

new CryptKeeper().encrypt(mockData, "password", (err, cipher) => {
    TestRunner.run("Should encrypt a plaintext given value by its salt", cipher, assert.strictEqual, "b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566");
});

new CryptKeeper().decrypt("b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566", "password", (err, plaintext) => {
    TestRunner.run("Should decrypt a ciphertext given value by its salt", plaintext, assert.strictEqual, JSON.stringify(mockData));
});

new CryptKeeper().decrypt("b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566", "secret", (err, plaintext) => {
    TestRunner.run("Should fail to decrypt if given the wrong salt", err, assert.notStrictEqual, undefined);
});


