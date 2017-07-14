let crypto,
    cipherAlgorithm = "aes192",
    cipherInputEncoding = "utf8",
    cipherOutputEncoding = "hex",
    hashAlgorithm = "sha256",
    hashOutputEncoding = "hex";

class CryptKeeper {
    constructor(c = require("crypto")) {
        crypto = c;
    }

    hash(plainText, salt) {
        let hash = crypto.createHmac(hashAlgorithm, salt);

        hash.update(plainText);

        return hash.digest(hashOutputEncoding);
    }

    encrypt(plainText, salt, callback) {
        try {
            let cipher = crypto.createCipher(cipherAlgorithm, salt),
                cipherText = cipher.update(JSON.stringify(plainText), cipherInputEncoding, cipherOutputEncoding) + cipher.final(cipherOutputEncoding);

            callback(undefined, cipherText);
            return;
        }
        catch(err) {
            callback(err, undefined);
        }
    }

    decrypt(cipherText, salt, callback) {
        try {
            var decipher = crypto.createDecipher(cipherAlgorithm, salt),
                plainText = decipher.update(cipherText, cipherOutputEncoding, cipherInputEncoding) + decipher.final(cipherInputEncoding);

            callback(undefined, plainText);
            return;
        }
        catch(err) {
            callback(err, undefined);
        }
    }
}

module.exports = CryptKeeper;
