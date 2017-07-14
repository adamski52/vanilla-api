let routes = [],
    Route;

function getRoute(path, method) {
    return routes.find((route) => {
        let match = path.match(route.getPattern());
        return match && route.getMethod() === method;
    });
}

function handle404() {
    return (req, res, params, callback) => {
        res.statusCode = 404;
    };
}

class Router {
    constructor(_r = require("./Route")) {
        Route = _r;

        this.addRoute("(.*)", "GET", handle404);
        this.addRoute("(.*)", "POST", handle404);
        this.addRoute("(.*)", "PUT", handle404);
        this.addRoute("(.*)", "DELETE", handle404);
        this.addRoute("(.*)", "PATCH", handle404);
        this.addRoute("(.*)", "OPTIONS", handle404);
    }

    addRoute(pattern, method, handler) {
        let route = getRoute(pattern, method),
            isNew = false;

        if(!route) {
            isNew = true;
            route = new Route();
        }

        route.setPattern(pattern);
        route.setMethod(method);
        route.setHandler(handler);

        if(isNew) {
            routes.unshift(route);
        }

        return routes;
    }

    handleRequest(req, res) {
        let route = getRoute(req.url, req.method);
        if(!route) {
            res.statusCode = 404;
            return;
        }

        route.execute(req, res);
    }
}

module.exports = Router;