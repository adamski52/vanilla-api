const assert = require("assert"),
      TestRunner = require("../helpers/TestRunner"),
      IteratorsStore = require("./IteratorsStore"),
      StoreSystem = require("../helpers/StoreSystem"),
      MockFileSystem = require("../helpers/MockFileSystem");


let iterator = new IteratorsStore(StoreSystem, MockFileSystem),
    mockData;

TestRunner.beforeEach(() => {
    mockData = {
        "GLOBAL":{
            "current":15,
            "delta":1
        }
    };

    MockFileSystem.setMockData(JSON.stringify(mockData));
});


iterator.getIterator((err, value) => {
    TestRunner.run("Should retrieve the next iterator", value, assert.strictEqual, 16);
});


iterator.getIterator(() => {
    iterator.getIterator((err, value) => {
        TestRunner.run("Should save the incremented iterator", value, assert.strictEqual, 17);
    });
});


iterator.getIterator((err, value) => {
    let prevValue = value;

    iterator.getIterator((err, value) => {
        TestRunner.run("Should increment by delta", value - prevValue, assert.strictEqual, mockData.GLOBAL.delta);
    });
});

