const https = require("https"),
      fs = require("fs"),
      crypto = require("crypto"),
      Router = require("./Router"),
      UsersController = require("../API/Controllers/UsersController"),
      LoginController = require("../API/Controllers/LoginController"),
      ConfigurationController = require("../API/Controllers/ConfigurationController");

let router = new Router(),
    usersController = new UsersController(router),
    loginController = new LoginController(router),
    configurationController = new ConfigurationController(router);

module.exports = {
    start(port = 4242) {
        https.createServer({
            key: fs.readFileSync("_secure/keys/key.pem"),
            cert: fs.readFileSync("_secure/keys/cert.pem")
        }, router.handleRequest).listen(port);

        console.log("server running on :" + port);
    }
};