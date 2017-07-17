let fs,
    crypto,
    sessionPath,
    CookieMonster,
    CryptKeeper,
    storePath = "_secure/stores/sessions/";

class Session {
    constructor(_fs = require("fs"),
                _crypto = require("crypto"),
                _CryptKeeper = require("../../Utils/CryptKeeper"),
                _CookieMonster = require("../../Utils/CookieMonster")) {
        fs = _fs;
        CookieMonster = _CookieMonster;
        CryptKeeper = _CryptKeeper;
        crypto = _crypto;
    }

    create(cipherUsername, callback) {
        let sessionId;
        do {
            // mac, linux and win all limit file names to 255 char max and 1 byte = 2 hex chars, so 127 max
            sessionId = crypto.randomBytes(127).toString("hex");
            sessionPath = storePath + sessionId;
        } while(fs.existsSync(sessionPath));

        fs.writeFile(sessionPath, cipherUsername, (err, cipherContents) => {
            if(err) {
                callback(err, undefined);
                return;
            }

            callback(undefined, sessionId);
        });
    }

    getUserAuthentication(req, callback) {
        let cookies = CookieMonster.nom(req);

        // TODO:  Abstract this.  repeats a few times.
        if(!(cookies.hasOwnProperty("SESSIONID") && cookies.hasOwnProperty("USERID"))) {
            callback(false);
            return;
        }

        sessionPath = storePath + cookies.SESSIONID;

        fs.readFile(sessionPath, "utf8", (err, cipherContents) => {
           if(err) {
               callback(false);
               return;
           }

           let cipherUsername = new CryptKeeper().hash(cookies.USERID, cookies.USERID);
           callback(cipherUsername === cipherContents);
        });
    }

    destroy(sessionId, callback = () => {}) {
        sessionPath = storePath + sessionId;
        fs.exists(sessionPath, (exists) => {
            if(!exists) {
                callback();
                return;
            }

            callback();

            fs.unlink(sessionPath);
        });
    }
}

module.exports = Session;