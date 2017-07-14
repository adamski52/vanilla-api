let routes = [];

function getRoute(path, method) {
    return routes.find((route) => {
        let match = path.match(new RegExp(route.pattern + "$"));
        return match;
    });
}

function handle404(req, res, params) {
    res.statusCode = 404;
    res.end();
}

function execute(route, req, res) {
    let params = req.url.match(route.pattern);

    route.handler(req, res, params);
}

class Router {
    constructor() {
        this.addRoute("root", "(.*)", ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], handle404);
    }

    addRoute(name, pattern, methods, handler) {
        let isNew = false,
            route = routes.find((r) => {
                return r.pattern === pattern;
            });

        if(!route) {
            isNew = true;
            route = {};
        }

        route.name = name;
        route.pattern = pattern;
        route.methods = methods;
        route.handler = handler;

        if(isNew) {
            routes.unshift(route);
        }

        return routes;
    }

    handleRequest(req, res) {
        let route = getRoute(req.url, req.method);
        execute(route, req, res);
    }
}

module.exports = Router;