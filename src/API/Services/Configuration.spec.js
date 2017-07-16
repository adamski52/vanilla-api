const assert = require("assert"),
    TestRunner = require("../../Utils/TestRunner"),
    Configuration = require("./Configuration"),
    mockFs = require("../../../_mocks/MockFileSystem");

mockFs.setMockData("");
let configuration = new Configuration(mockFs);

TestRunner.setContext("Configurations");

configuration.create({
    // name: "host123",
    hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Should require name", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    // hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Should require hostname", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    hostname: "localhost",
    // port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Should require port", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    hostname: "localhost",
    port: 4242
    // username: "adamski"
}, (err, config) => {
    TestRunner.run("Should require username", err.message, assert.strictEqual, "Invalid configuration.");
});


let configObj = {
    name: "host123",
    hostname: "localhost",
    port: 4242,
    username: "adamski"
};

configuration.create(configObj, (err, config, isNew) => {
    TestRunner.run("Should create a configuration", JSON.stringify(configObj), assert.strictEqual, JSON.stringify(config));
    TestRunner.run("Should specify if the creation is new", isNew, assert.strictEqual, true);
});

configuration.create(Object.assign({}, configObj, {ip: "127.0.0.1"}), (err, config, isNew) => {
    TestRunner.run("Should toss info we don't care about", JSON.stringify(configObj), assert.strictEqual, JSON.stringify(config));
    TestRunner.run("Should specify if the creation is existing", isNew, assert.strictEqual, false);
});

