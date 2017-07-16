const ApiController = require("./ApiController");

let session,
    configuration,
    routeConfigs = [{
        pattern: "/api/configurations"
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
            configuration.get((err, contents) => {
                if(err) {
                    this.fail(res, err);
                    return;
                }

                res.end(JSON.stringify(contents));
            });
        });
    }

    put(req, res, params, body) {
        this.requireAuthentication(req, res, session, () => {
            configuration.update(body, (err, config) => {
                if (err) {
                    this.fail(res, err);
                    return;
                }

                res.end(JSON.stringify(config));
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

    delete(req, res, params, body) {
        this.requireAuthentication(req, res, session, () => {
            configuration.destroy(body, (err) => {
                if(err) {
                    this.fail(res, err);
                    return;
                }

                res.end();
            });
        });
    }
}

module.exports = ConfigurationController;