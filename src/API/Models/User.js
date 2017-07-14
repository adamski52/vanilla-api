let storeSystem,
    cryptKeeper,
    fs,
    storePath = "_secure/stores/users/";


class User {
    constructor(StoreSystem = require("../../Utils/StoreSystem"),
                _fs = require("fs"),
                CryptKeeper = require("../../Utils/CryptKeeper")) {
        fs = _fs;

        storeSystem = new StoreSystem();
        cryptKeeper = new CryptKeeper();
    }

    login(plaintextUsername, plaintextPassword, callback) {
        let cipherUsername = cryptKeeper.hash(plaintextUsername, plaintextUsername);
        storeSystem.read(storePath + cipherUsername + ".json", (err, cipherContents) => {
            // TODO:  The response time difference between a "real user + bad password" fail and "no such user" fail could be used to ascertain the existence of a user.
            // Maybe need to use un + pw to create the filename and rename the file when password changes so that there's no difference in timing.  Would be O(1) still.

            if(err) {
                callback(err, undefined);
                return;
            }

            cryptKeeper.decrypt(cipherContents, plaintextPassword, (err, decryptedContents) => {
                if(err) {
                    callback(err, undefined);
                    return;
                }

                callback(undefined, JSON.parse(decryptedContents));
            });
        });
    }
}

module.exports = User;