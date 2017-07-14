const assert = require("assert"),
      TestRunner = require("../helpers/TestRunner"),
      UsersStore = require("./UsersStore"),
      fs = require("fs");

let userStore = new UsersStore();

//fs.writeFileSync("_secure/stores/users/73ebfa193babfa8f594fcd9c47d3f9e094b49c91555d219e7399ebaf66d8bed0.json", "b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566");
userStore.login("adamski", "password", (err, user) => {
    TestRunner.run("Should return a user object upon valid login", user.username, assert.strictEqual, "adamski");
});