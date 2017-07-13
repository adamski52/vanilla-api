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

    encrypt(plainText, salt) {
        let cipher = crypto.createCipher(cipherAlgorithm, salt),
            cipherText = cipher.update(JSON.stringify(plainText), cipherInputEncoding, cipherOutputEncoding) + cipher.final(cipherOutputEncoding);

        return cipherText;
    }

    decrypt(cipherText, pepper) {
        try {
            var decipher = crypto.createDecipher(cipherAlgorithm, pepper),
                plainText = decipher.update(cipherText, cipherOutputEncoding, cipherInputEncoding) + decipher.final(cipherInputEncoding);
        }
        catch(e) {
            return "";
        }

        return plainText;
    }
}

module.exports = CryptKeeper;
