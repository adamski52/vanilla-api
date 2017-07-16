const ApiController = require("./ApiController");

let User,
    router,
    user,
    routeConfigs = [{
        key: "users_login_url",
        pattern: "/api/users/login",
        methods: ["POST"]
    }];

class UsersController extends ApiController {
    constructor(_r, _User = require("../Services/User")) {
        super();
        router = _r;
        User = _User;
        user = new User();


        routeConfigs.forEach((route) => {
            router.addRoute(route, (req, res, params) => {
                this.routeRequest(req, res, params);
            });
        });
    }

    post(req, res, params, body) {
        if(!body || !body.username || !body.password) {
            this.fail(res, {
                message: "Username and password are required."
            });
            return;
        }


        user.login(body.username, body.password, (err, userObj, sessionId) => {
            if (err) {
                return this.fail(res, err);
            }

            user.destroySession(req, (err, oldSessionId) => {
                res.setHeader("Set-Cookie", [
                    "SESSIONID=" + sessionId
                ]);

                res.end(JSON.stringify(userObj));
            });
        });
    }

    delete(req, res, params, body) {
        user.destroySession(req, (err, oldSessionId) => {
            if(oldSessionId) {
                res.setHeader("Set-Cookie", [
                    "SESSIONID=" + oldSessionId + "; expires=" + new Date(0).toUTCString(),
                ]);
            }

            res.writeHead(204);

            res.end();
        });

    }
}

module.exports = UsersController;