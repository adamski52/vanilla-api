const https = require("https"),
      fs = require("fs");

module.exports = {
    start(port = 4242) {
        https.createServer({
            key: fs.readFileSync("keys/key.pem"),
            cert: fs.readFileSync("keys/cert.pem")
        }, (req, res) => {
            res.writeHead(200);
            res.end("great success");
        }).listen(port);

        console.log("server running on :" + port);
    }
};