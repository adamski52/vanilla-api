const https = require("https"),
      fs = require("fs"),
      crypto = require("crypto");


module.exports = {
    start(port = 4242) {
        https.createServer({
            key: fs.readFileSync("_secure/keys/key.pem"),
            cert: fs.readFileSync("_secure/keys/cert.pem")
        }, (req, res) => {
            res.writeHead(200);
            res.end("great success");
        }).listen(port);

        console.log("server running on :" + port);
    }
};