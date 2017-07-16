let routes = [],
    routeConfigs = [{
        pattern: "(.*)",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    }];

function getRoute(path) {
    return routes.find((route) => {
        let match = path.match(new RegExp(route.pattern + "$"));
        return match;
    });
}

class Router {
    constructor() {
        routeConfigs.forEach((route) => {
            this.addRoute(route, (req, res) => {
                res.statusCode = 404;
                res.end();
            });
        });
    }

    addRoute(routeOptions, handler) {
        let route = routes.find((r) => {
            return r.pattern === routeOptions.pattern;
        });

        if(route) {
            route.handler = handler;
            route.pattern = routeOptions.pattern;
            route.methods = routeOptions.methods;
            return routes;
        }

        routeOptions.handler = handler;
        routes.unshift(routeOptions);

        return routes;
    }

    handleRequest(req, res) {
        let route = getRoute(req.url);
        route.handler(req, res);
    }
}

module.exports = Router;