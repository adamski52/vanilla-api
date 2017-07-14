const ApiController = require("./ApiController");

let User;

class UsersController extends ApiController {
    constructor(router, _User = require("../Models/User")) {
        super();
        User = _User;
        router.addRoute("users_url", "/api/users", ["POST", "GET"], (req, res, params) => {
            this.routeRequest(req, res, params);
        });
    }


    get(req, res, params) {
        res.end("get!");
    }

    post(req, res, params, body) {
        body = JSON.parse(body);

        let user = new User();
        user.login(body.username, body.password, (err, userObj) => {
            if(err) {
                return this.fail(res, err);
            }

            res.write(JSON.stringify(userObj));
        });
    }
}

module.exports = UsersController;