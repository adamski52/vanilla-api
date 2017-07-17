const assert = require("assert"),
    TestRunner = require("../../Utils/TestRunner"),
    Configuration = require("./Configuration"),
    mockFs = require("../../../_mocks/MockFileSystem"),
    TestHelpers = require("../../../_mocks/TestHelpers");

let configuration = new Configuration(mockFs);

TestRunner.setContext("Configurations / sorting");

TestRunner.beforeEach(() => {
    mockFs.setMockData(JSON.stringify(TestHelpers.getMockItems()));
});

configuration.get((err, contents) => {
    TestRunner.run("Should sort by name", TestHelpers.isSorted(contents.configurations, "name", TestHelpers.mockNames), assert.strictEqual, true);
}, {
    sortby: "name"
});

configuration.get((err, contents) => {
    TestRunner.run("Should sort by username", TestHelpers.isSorted(contents.configurations, "username", TestHelpers.mockUsernames), assert.strictEqual, true);
}, {
    sortby: "username"
});

configuration.get((err, contents) => {
    TestRunner.run("Should sort by hostname", TestHelpers.isSorted(contents.configurations, "hostname", TestHelpers.mockHostnames), assert.strictEqual, true);
}, {
    sortby: "hostname"
});

configuration.get((err, contents) => {
    TestRunner.run("Should sort by port", TestHelpers.isSorted(contents.configurations, "port", TestHelpers.mockPorts), assert.strictEqual, true);
}, {
    sortby: "port"
});
