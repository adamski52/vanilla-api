const ApiController = require("./ApiController");

let user,
    routeConfigs = [{
        pattern: /\/api\/users\/login/g
    }];

class LoginController extends ApiController {
    constructor(router,
                UserService = require("../Services/UserService")) {
        super(router, routeConfigs);

        user = new UserService();
    }

    post(req, res, params, body) {
        user.login(body.username, body.password, (err, userObj, sessionId) => {
            if (err) {
                return this.fail(res, err);
            }

            user.destroySession(req, () => {
                res.setHeader("Set-Cookie", [
                    "SESSIONID=" + sessionId + ";path=/",
                    "USERID=" + body.username + ";path=/"
                ]);

                res.end(JSON.stringify(userObj));
            });
        });
    }

    delete(req, res, params, body) {
        user.destroySession(req, () => {
            res.setHeader("Set-Cookie", [
                "SESSIONID=; expires=" + new Date(0).toUTCString() + ";path=/",
                "USERID=; expires=" + new Date(0).toUTCString() + ";path=/"
            ]);

            res.writeHead(204);

            res.end();
        });

    }
}

module.exports = LoginController;