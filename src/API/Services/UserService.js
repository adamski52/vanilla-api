let cryptKeeper,
    fs,
    session,
    storePath = "_secure/stores/users/",
    CookieMonster;


function createUser(plaintextUsername, plaintextPassword, userFilePath, callback) {
    let user = {
        username: plaintextUsername
    };

    cryptKeeper.encrypt(user, plaintextPassword, (err, cipheredContents) => {
        if(err) {
            callback(err);
            return;
        }

        fs.writeFile(userFilePath, cipheredContents, (err) => {
            if (err) {
                callback(err, undefined);
                return;
            }

            callback(undefined, user);
        });
    });
}

class User {
    constructor(_fs = require("fs"),
                CryptKeeper = require("../../Utils/CryptKeeper"),
                Session = require("./Session"),
                _CookieMonster = require("../../Utils/CookieMonster")) {
        fs = _fs;

        session =  new Session();
        cryptKeeper = new CryptKeeper();
        CookieMonster = _CookieMonster;
    }

    create(plaintextUsername, plaintextPassword, callback) {
        let cipherUsername = cryptKeeper.hash(plaintextUsername, plaintextUsername),
            userFilePath = storePath + cipherUsername + ".json";

        fs.exists(userFilePath, (exists) => {
            if(exists) {
                callback({
                    message: "User exists."
                });
                return;
            }

            createUser(plaintextUsername, plaintextPassword, userFilePath, callback);
        });
    }

    login(plaintextUsername, plaintextPassword, callback) {
        let cipherUsername = cryptKeeper.hash(plaintextUsername, plaintextUsername);
        fs.readFile(storePath + cipherUsername + ".json", "utf8", (err, cipherContents) => {
            // TODO:  The response time difference between a "real user + bad password" fail and "no such user" fail could be used to ascertain the existence of a user.
            // Maybe need to use un + pw to create the filename and rename the file when password changes so that there's no difference in timing.  Would be O(1) still.

            if(err) {
                callback(err);
                return;
            }

            cryptKeeper.decrypt(cipherContents, plaintextPassword, (err, decryptedContents) => {
                if(err) {
                    callback(err);
                    return;
                }

                session.create(cipherUsername, (err, sessionKey) => {
                    if(err) {
                        callback(err);
                        return;
                    }

                    callback(undefined, JSON.parse(decryptedContents), sessionKey);
                });
            });
        });
    }

    destroySession(req, callback) {
        let cookies = CookieMonster.nom(req);
        if(cookies.hasOwnProperty("SESSIONID")) {
            session.destroy(cookies.SESSIONID);
        }

        callback();
    }
}

module.exports = User;