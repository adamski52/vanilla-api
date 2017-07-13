const assert = require("assert"),
      TestRunner = require("../helpers/TestRunner"),
      UsersStore = require("./UsersStore"),
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


let iterator = new UsersStore(StoreSystem, mockFs),
    mockData,
    mockDataObj;

TestRunner.beforeEach(() => {
    mockDataObj = {
        "id": 123,
        "username": "user"
    };

    mockData = JSON.stringify(mockDataObj);
});


iterator.getUser(credential, (user) => {
    TestRunner.run("Should retrieve the user object if un/pw is valid", user, assert.deepStrictEqual, mockDataObj);
});
