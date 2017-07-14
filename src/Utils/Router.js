let routes = [],
    routeConfigs = [{
        key: "root",
        pattern: "(.*)",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    }];

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
        routeConfigs.forEach((route) => {
            this.addRoute(route, handle404);
        });
    }

    addRoute(routeOptions, handler) {
        let route = routes.find((r) => {
            return r.pattern === routeOptions.pattern;
        });

        if(route) {
            route.handler = handler;
            route.pattern = routeOptions.pattern;
            route.key = routeOptions.key;
            route.methods = routeOptions.methods;
            return routes;
        }


        routeOptions.handler = handler;
        routes.unshift(routeOptions);

        return routes;
    }

    handleRequest(req, res) {
        let route = getRoute(req.url, req.method);
        execute(route, req, res);
    }
}

module.exports = Router;