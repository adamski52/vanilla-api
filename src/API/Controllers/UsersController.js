const ApiController = require("./ApiController");

let User,
    router,
    CookieMonster,
    routeConfigs = [{
        key: "users_url",
        pattern: "/api/users",
        methods: ["POST", "GET"]
    }];

class UsersController extends ApiController {
    constructor(_r, _User = require("../Services/User"), _CookieMonster = require("../../Utils/CookieMonster")) {
        super();
        router = _r;
        User = _User;
        CookieMonster = _CookieMonster;

        routeConfigs.forEach((route) => {
            router.addRoute(route, (req, res, params) => {
                this.routeRequest(req, res, params);
            });
        });
    }


    post(req, res, params, body) {
        body = JSON.parse(body);
        let user = new User();
        user.create(body.username, body.password, (err, createdUser) => {
            if (err) {
                return this.fail(res, err);
            }

            res.writeHead(201);
            res.end(JSON.stringify(createdUser));
        });
    }
}

module.exports = UsersController;