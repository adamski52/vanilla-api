const assert = require("assert"),
      thing = require("../index"),
      TestRunner = require("./handlers/TestRunner");

TestRunner.run("I should work", "hello", assert.equal, "hello");
TestRunner.run("I should not work", "something", assert.equal, "something else");
TestRunner.run("A thing should be 2", thing.getThing(), assert.strictEqual, 2);
