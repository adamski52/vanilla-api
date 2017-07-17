const ApiController = require("./ApiController");

let session,
    configuration,
    routeConfigs = [{
        pattern: /(\/api\/configurations\??)|([^=&]*=[^=&]*)|&|([^=&]*=[^=&]*)/g
    }];

class ConfigurationController extends ApiController {
    constructor(router,
                SessionService = require("../Services/SessionService"),
                ConfigurationService = require("../Services/ConfigurationService")) {

        super(router, routeConfigs);

        session = new SessionService();
        configuration = new ConfigurationService();
    }

    get(req, res, params, body) {
        this.requireAuthentication(req, res, session, () => {
            configuration.get((err, contents) => {
                if(err) {
                    this.fail(res, err);
                    return;
                }

                res.end(JSON.stringify(contents));
            }, params);
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