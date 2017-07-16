const ApiController = require("./ApiController");

let user,
    CookieMonster,
    routeConfigs = [{
        pattern: "/api/users",
        methods: ["POST", "GET"]
    }];

class UsersController extends ApiController {
    constructor(router,
                User = require("../Services/User"),
                _CookieMonster = require("../../Utils/CookieMonster")) {

        super(router, routeConfigs);
        user = new User();
        CookieMonster = _CookieMonster;
    }


    post(req, res, body) {
        body = JSON.parse(body);
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