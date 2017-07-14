const assert = require("assert"),
      TestRunner = require("../../Utils/TestRunner"),
      User = require("./User"),
      fs = require("fs");

let user = new User();

fs.writeFileSync("../../../_secure/stores/users/73ebfa193babfa8f594fcd9c47d3f9e094b49c91555d219e7399ebaf66d8bed0.json", "b5253129330f4afa17292733fa81803149ca6e6b96e62add2ef359c808e5d566");
user.login("adamski", "password", (err, u) => {
    TestRunner.run("Should return a user object upon valid login", u.username, assert.strictEqual, "adamski");
});