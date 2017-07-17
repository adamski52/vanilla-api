const ApiController = require("./ApiController");

let user,
    CookieMonster,
    routeConfigs = [{
        pattern: /\/api\/users/g
    }];

class UsersController extends ApiController {
    constructor(router,
                UserService = require("../Services/UserService"),
                _CookieMonster = require("../../Utils/CookieMonster")) {

        super(router, routeConfigs);
        user = new UserService();
        CookieMonster = _CookieMonster;
    }


    post(req, res, params, body) {
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