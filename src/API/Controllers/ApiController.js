function parseReqBody(req, callback) {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        body = body.join("");
        callback(body);
    });
}


class ApiController {
    constructor(router, routeConfigs) {
        routeConfigs.forEach((route) => {
            router.addRoute(route, (req, res, params) => {
                this.routeRequest(req, res, params);
            });
        });
    }

    routeRequest(req, res, params) {
        let method = req.method.toLowerCase();
        if(this[method]) {
            parseReqBody(req, (body) => {
                try {
                    if(body) {
                        body = JSON.parse(body);
                    }

                    this[method](req, res, params, body);
                }
                catch(err) {
                    this.fail(res, err);
                    return;
                }
            });
            return;
        }

        res.statusCode = 405;
        res.end();
    }

    fail(res, err, statusCode = 400) {
        res.statusCode = statusCode;
        res.end(JSON.stringify({
            error: err.message || "An error occurred.",
            stack: err.stack
        }));
    }


    // http spec specifies that the server must at a minimum respond to HEAD and GET
    head(req, res, params) {
        res.end();
    }

    get(req, res, params) {
        res.end();
    }

    requireAuthentication(req, res, session, callback) {
        session.getUserAuthentication(req, (isAuthenticated) => {
            if (!isAuthenticated) {
                this.fail(res, {
                    message: "Authentication required."
                }, 401);
                return;
            }

            callback();
        });
    }
}

module.exports = ApiController;
