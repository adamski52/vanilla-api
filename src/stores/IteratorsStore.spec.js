const assert = require("assert"),
      TestRunner = require("../helpers/TestRunner"),
      IteratorsStore = require("./IteratorsStore"),
      StoreSystem = require("../helpers/StoreSystem"),
      mockFs = {
          readFile: function(file, callback) {
              callback(undefined, mockData);
          },
          writeFile: function(file, data, callback) {
              mockData = data;

              callback();
          }
      };


let iterator = new IteratorsStore(StoreSystem, mockFs),
    mockData,
    mockDataObj;

TestRunner.beforeEach(() => {
    mockDataObj = {
        "GLOBAL":{
            "current":15,
            "delta":1
        }
    };

    mockData = JSON.stringify(mockDataObj);
});


iterator.getIterator((value) => {
    TestRunner.run("Should retrieve the next iterator", value, assert.strictEqual, 16);
});


iterator.getIterator(() => {
    iterator.getIterator((value) => {
        TestRunner.run("Should save the incremented iterator", value, assert.strictEqual, 17);
    });
});


iterator.getIterator((value) => {
    let prevValue = value;

    iterator.getIterator((value) => {
        TestRunner.run("Should increment by delta", value - prevValue, assert.strictEqual, mockDataObj.GLOBAL.delta);
    });
});

