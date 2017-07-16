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
    TestRunner.run("Create should require name", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    // hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Create should require hostname", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    hostname: "localhost",
    // port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Create should require port", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.create({
    name: "host123",
    hostname: "localhost",
    port: 4242
    // username: "adamski"
}, (err, config) => {
    TestRunner.run("Create should require username", err.message, assert.strictEqual, "Invalid configuration.");
});



configuration.update({
    // name: "host123",
    hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Update should require name", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.update({
    name: "host123",
    // hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Update should require hostname", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.update({
    name: "host123",
    hostname: "localhost",
    // port: 4242,
    username: "adamski"
}, (err, config) => {
    TestRunner.run("Update should require port", err.message, assert.strictEqual, "Invalid configuration.");
});

configuration.update({
    name: "host123",
    hostname: "localhost",
    port: 4242
    // username: "adamski"
}, (err, config) => {
    TestRunner.run("Update should require username", err.message, assert.strictEqual, "Invalid configuration.");
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
    TestRunner.run("Create should toss info we don't care about", JSON.stringify(configObj), assert.strictEqual, JSON.stringify(config));
});

configuration.update(Object.assign({}, configObj, {ip: "127.0.0.1"}), (err, config, isNew) => {
    TestRunner.run("Update should toss info we don't care about", JSON.stringify(configObj), assert.strictEqual, JSON.stringify(config));
});

configuration.create(Object.assign({}, configObj, {
    hostname: "google.com",
    port: 1234,
    username: "smith"
}), (err, config, isNew) => {
    TestRunner.run("Should not create an item if the name already exists", isNew, assert.strictEqual, false);
});

configuration.create({
    name: "host345",
    hostname: "localhost",
    port: 4242,
    username: "adamski"
}, (err, config) => {
    configuration.getAll((err, configurations) => {
        TestRunner.run("Should return all configurations", configurations.configurations.length, assert.strictEqual, 2);
    });

    configuration.getByName("host123", (err, configurations) => {
        let properLength = configurations.configurations.length === 1,
            properObject = JSON.stringify(configurations.configurations[0]) === JSON.stringify(configObj);
        TestRunner.run("Should return configurations matching a specified name", properLength && properObject, assert.strictEqual, true);
    });
});

configObj = {
    name: "host123",
    hostname: "camelot",
    port: 9999,
    username: "arthur"
};
configuration.update(configObj, (err, config) => {
    TestRunner.run("Should return the updated item", JSON.stringify(config), assert.strictEqual, JSON.stringify(configObj));

    configuration.getAll((err, configurations) => {
        let properObject = JSON.stringify(configurations.configurations[0]) === JSON.stringify(configObj);
        TestRunner.run("Should update response within all configurations", properObject, assert.strictEqual, true);
    });
});



