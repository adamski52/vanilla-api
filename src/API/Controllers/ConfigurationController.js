const ApiController = require("./ApiController");

let session,
    configuration,
    routeConfigs = [{
        key: "configuration_url",
        pattern: "/api/configurations",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }];

class ConfigurationController extends ApiController {
    constructor(router,
                Session = require("../Services/Session"),
                Configuration = require("../Services/Configuration")) {

        super(router, routeConfigs);

        session = new Session();
        configuration = new Configuration();
    }

    get(req, res, params, body) {
        this.requireAuthentication(req, res, session, () => {
            configuration.getAll((err, contents) => {
                if(err) {
                    this.fail(res, err);
                    return;
                }

                res.end(JSON.stringify(contents));
            });
        });
    }

    post(req, res, params, body) {
        this.requireAuthentication(req, res, session, () => {
            configuration.create(body, (err, config, wasCreated) => {
                if(err) {
                    this.fail(res, err);
                    return;
                }

                if(!wasCreated) {
                    res.writeHead(209);
                }

                res.end(JSON.stringify(config));
            });
        });
    }
}

module.exports = ConfigurationController;