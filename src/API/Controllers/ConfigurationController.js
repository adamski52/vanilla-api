const ApiController = require("./ApiController"),
      VALID_SORTS = ["name", "hostname", "port", "username"];

let session,
    configuration,
    routeConfigs = [{
        pattern: /(\/api\/configurations\??)|([^=&]*=[^=&]*)|&|([^=&]*=[^=&]*)/g
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

                let items = [];

                if(params.hasOwnProperty("sortby")) {
                    let sortby = params.sortby;

                    if(VALID_SORTS.indexOf(sortby) >= 0) {
                        contents = contents.sort((lhs, rhs) => {
                            if (lhs[sortby] > rhs[sortby]) {
                                return -1;
                            }

                            if (lhs[sortby] < rhs[sortby]) {
                                return 1;
                            }

                            return 0;
                        });
                    }
                }

                if(params.hasOwnProperty("page") && params.hasOwnProperty("per")) {
                    let page = parseInt(params.page, 10) || 0,
                        per = parseInt(params.per, 10) || 5,
                        startItem = Math.min(per * page, contents.length),
                        endItem = Math.min(startItem + per, contents.length);

                    for(let i = startItem; i < endItem; i++) {
                        items.push(contents[i]);
                    }
                }
                else {
                    items = contents;
                }

                res.end(JSON.stringify(items));
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