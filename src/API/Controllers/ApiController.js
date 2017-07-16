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
    routeRequest(req, res, params) {
        let method = req.method.toLowerCase();
        if(this[method]) {
            parseReqBody(req, (body) => {
                try {
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
        res.end(err.message || "An error occurred.");
    }


    // http spec specifies that the server must at a minimum respond to HEAD and GET
    head(req, res, params) {
        res.end();
    }

    get(req, res, params) {
        res.end();
    }
}

module.exports = ApiController;
