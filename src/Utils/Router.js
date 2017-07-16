let routes = [],
    routeConfigs = [{
        pattern: "(.*)"
    }];

function getRoute(path) {
    return routes.find((route) => {
        let match = path.match(new RegExp(route.pattern + "$"));
        return match;
    });
}

function execute(route, req, res) {
    let params = req.url.match(route.pattern);
    route.handler(req, res, params);
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
            return routes;
        }

        routeOptions.handler = handler;
        routes.unshift(routeOptions);

        return routes;
    }

    handleRequest(req, res) {
        let route = getRoute(req.url);
        execute(route, req, res);
    }
}

module.exports = Router;