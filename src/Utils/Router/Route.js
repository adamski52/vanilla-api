let pattern,
    method,
    handler = () => {};

class Route {
    constructor(){}

    setPattern(_pattern) {
        pattern = _pattern;
    }

    getPattern() {
        return pattern;
    }

    setMethod(_method) {
        method = _method;
    }

    getMethod() {
        return method;
    }

    setHandler(_handler) {
        handler = _handler;
    }

    getHandler() {
        return handler;
    }

    execute(req, res, callback) {
        let params = req.url.match(this.getPattern());

        this.getHandler()(req, res, params, callback);
    }
}

module.exports = Route;
