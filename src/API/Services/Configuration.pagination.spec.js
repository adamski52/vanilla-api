const assert = require("assert"),
    TestRunner = require("../../Utils/TestRunner"),
    Configuration = require("./Configuration"),
    mockFs = require("../../../_mocks/MockFileSystem"),
    TestHelpers = require("../../../_mocks/TestHelpers");

let configuration = new Configuration(mockFs);

TestRunner.setContext("Configurations / pagination");

TestRunner.beforeEach(() => {
    mockFs.setMockData(JSON.stringify(TestHelpers.getMockItems()));
});

configuration.get((err, contents) => {
    TestRunner.run("Should give all if no size specified", contents.configurations.length, assert.strictEqual, 10);
});

configuration.get((err, contents) => {
    TestRunner.run("Should give all items if only 'page' is given", contents.configurations.length, assert.strictEqual, 10);
}, {
    page: 0
});

configuration.get((err, contents) => {
    TestRunner.run("Should give all items if only 'per' is given", contents.configurations.length, assert.strictEqual, 10);
}, {
    per: 5
});

configuration.get((err, contents) => {
    TestRunner.run("Should give appropriate number of items", contents.configurations.length, assert.strictEqual, 5);
}, {
    page: 0,
    per: 5
});

configuration.get((err, contents) => {
    let isProperOrder = TestHelpers.isSorted(contents.configurations, "username", TestHelpers.mockUsernames);
    TestRunner.run("Should sort before paging", isProperOrder, assert.strictEqual, true);
    TestRunner.run("Should give appropriate number of items after sorting", contents.configurations.length, assert.strictEqual, 5);
}, {
    sortby: "username",
    page: 0,
    per: 5
});

configuration.get((err, contents) => {
    let pass = contents.configurations.length === 3 &&
               contents.configurations[0].username === "green arrow" &&
               contents.configurations[1].username === "hellboy" &&
               contents.configurations[2].username === "iceman";

    TestRunner.run("Should give the proper items based on page and per", pass, assert.strictEqual, true);
}, {
    sortby: "username",
    page: 2,
    per: 3
});

configuration.get((err, contents) => {
    TestRunner.run("Should use page 0 if an invalid page is given", contents.configurations.length, assert.strictEqual, 5);
}, {
    page: -10,
    per: 5
});

configuration.get((err, contents) => {
    TestRunner.run("Should use per 5 if an invalid per is given", contents.configurations.length, assert.strictEqual, 5);
}, {
    page: 0,
    per: -5
});

configuration.get((err, contents) => {
    TestRunner.run("Should give no results if page is overflowed", contents.configurations.length, assert.strictEqual, 0);
}, {
    page: 100,
    per: 5
});

configuration.get((err, contents) => {
    TestRunner.run("Should handle overflowed page + per", contents.configurations.length, assert.strictEqual, 2);
}, {
    page: 2,
    per: 4
});