const assert = require("assert"),
      TestRunner = require("./handlers/TestRunner");

TestRunner.run("I should work", "hello", assert.equal, "hello");
TestRunner.run("I should not work", "something", assert.equal, "something else");
