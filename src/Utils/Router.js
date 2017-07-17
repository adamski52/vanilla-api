let routes = [],
    routeConfigs = [{
        pattern: /(.*)/g
    }];

function getRoute(path) {
    return routes.find((route) => {
        let match = path.match(route.pattern);
        return match;
    });
}

function execute(route, req, res) {
    let params = req.url.match(route.pattern);

    params = params.filter((m) => {
        return m !== "&"
    });

    let keyValueMap = {},
        keyValuePair;

    // have to skip the first since it's the base route
    for(let i = 1, il = params.length; i < il; i++) {
        keyValuePair = params[i].split("=");
        keyValueMap[keyValuePair[0]] = keyValuePair[1];
    }

    route.handler(req, res, keyValueMap);
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