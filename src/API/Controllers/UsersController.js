const ApiController = require("./ApiController");

let User,
    router,
    routeConfigs = [{
        key: "users_url",
        pattern: "/api/users",
        methods: ["POST", "GET"]
    }];

class UsersController extends ApiController {
    constructor(_r, _User = require("../Models/User")) {
        super();
        router = _r;
        User = _User;

        routeConfigs.forEach((route) => {
            router.addRoute(route, (req, res, params) => {
                this.routeRequest(req, res, params);
            });
        });
    }


    get(req, res, params) {
        res.end("HI!");
    }

    post(req, res, params, body) {
        body = JSON.parse(body);

        let user = new User();
        user.login(body.username, body.password, (err, userObj) => {
            if(err) {
                return this.fail(res, err);
            }

            res.end(JSON.stringify(userObj));
        });
    }
}

module.exports = UsersController;