let fs,
    crypto,
    sessionPath,
    storePath = "_secure/stores/sessions/";

class Session {
    constructor(_fs = require("fs"),
                _crypto = require("crypto")) {
        fs = _fs;

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

    destroy(sessionId, callback) {
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