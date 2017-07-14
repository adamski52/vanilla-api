const https = require("https"),
      fs = require("fs"),
      crypto = require("crypto"),
      Router = require("./../Router/Router");

let router = new Router();
router.addRoute("/api/user/login", "POST");
router.addRoute("/api/user/([0-9]+)", "GET");

module.exports = {
    start(port = 4242) {
        https.createServer({
            key: fs.readFileSync("_secure/keys/key.pem"),
            cert: fs.readFileSync("_secure/keys/cert.pem")
        }, (req, res) => {
            new Router().handleRequest(req, res);
        }).listen(port);

        console.log("server running on :" + port);
    }
};