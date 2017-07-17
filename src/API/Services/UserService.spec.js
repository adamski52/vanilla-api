const assert = require("assert"),
      TestRunner = require("../../Utils/TestRunner"),
      UserService = require("./UserService"),
      fs = require("fs");

TestRunner.setContext("Users");

let user = new UserService();


function cleanupSessions(sessionKey) {
    fs.unlinkSync("_secure/stores/sessions/" + sessionKey);
}

// login an explicit part of the challenge, so doing e2e tests instead of mocks


// kill the user in case it already exists somehow
try {
    fs.unlinkSync("_secure/stores/users/73ebfa193babfa8f594fcd9c47d3f9e094b49c91555d219e7399ebaf66d8bed0.json");
}
catch(e) {
    // s'ok
}


user.create("adamski", "password", (err) => {
    TestRunner.run("Should create a user if the user does not exist", err, assert.strictEqual, undefined);

    user.create("adamski", "password", (err) => {
        TestRunner.run("Should not create a user if the user already exists", err.message, assert.strictEqual, "User exists.");
    });

    user.login("adamski", "password", (err, u, sessionKey) => {
        TestRunner.run("Should return a user object upon valid login", u.username, assert.strictEqual, "adamski");
        cleanupSessions(sessionKey);
    });

    user.login("adamski", "password", (err, u, sessionKey) => {
        TestRunner.run("Should return a session key", sessionKey.length, assert.strictEqual, 254);
        cleanupSessions(sessionKey);
    });

    user.login("adamski", "wrong", (err, u) => {
        TestRunner.run("Should be sad about an invalid password", err, assert.notStrictEqual, undefined);
    });

    user.login("schmadamski", "password", (err, u) => {
        TestRunner.run("Should be sad about an invalid username", err, assert.notStrictEqual, undefined);
    });
});



