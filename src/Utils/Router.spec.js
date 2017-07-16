const assert = require("assert"),
    TestRunner = require("./TestRunner"),
    Router = require("./Router");

TestRunner.setContext("Router");

let router = new Router(),
    routes,
    canary,
    mockReq = {
        url: "/hello/world",
        method: "GET"
    };

routes = router.addRoute({
    pattern: "/hello/world",
    methods: ["GET"]
}, (req, res, params) => {});
TestRunner.run("Should add a route", routes.length, assert.strictEqual, 2);





routes = router.addRoute({
    pattern: "/hello/world",
    methods: ["GET", "PUT"]
}, (req, res, params) => {});

TestRunner.run("Should update route methods", routes[0].methods.length, assert.strictEqual, 2);
TestRunner.run("Should not recreate routes", routes.length, assert.strictEqual, 2);





canary = undefined;
router.addRoute({
    pattern: "/hello/world",
    methods: ["GET"]
}, (req, res, params) => {
    canary = false;
});
router.addRoute({
    pattern: "/hello/world",
    methods: ["GET"]
}, (req, res, params) => {
    canary = true;
});
router.handleRequest(mockReq);

TestRunner.run("Should update the handler", canary, assert.strictEqual, true);





let res = {
    end: function(){}
};

router.handleRequest({
    url: "/i/dont/exist",
    method: "GET"
}, res);
TestRunner.run("Should 404 if no matching route", res.statusCode, assert.strictEqual, 404);





routes = router.addRoute({
    pattern: "/hello/world",
    methods: ["GET", "POST"]
}, (req, res, params) => {});
TestRunner.run("Should allow the same route with different methods", routes.length, assert.strictEqual, 2);



