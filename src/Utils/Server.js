const https = require("https"),
      fs = require("fs"),
      crypto = require("crypto"),
      Router = require("./Router"),
      UsersController = require("../API/Controllers/UsersController"),
      LoginController = require("../API/Controllers/LoginController");

let router = new Router(),
    usersController = new UsersController(router),
    loginController = new LoginController(router);

module.exports = {
    start(port = 4242) {
        https.createServer({
            key: fs.readFileSync("_secure/keys/key.pem"),
            cert: fs.readFileSync("_secure/keys/cert.pem")
        }, (req, res) => {
            router.handleRequest(req, res);
        }).listen(port);

        console.log("server running on :" + port);
    }
};