const assert = require("assert"),
    TestRunner = require("./TestRunner"),
    Router = require("./Router");

let router = new Router(),
    routes,
    canary,
    mockReq = {
        url: "/hello/world",
        method: "GET"
    };

routes = router.addRoute("endpoint", "/hello/world", ["GET"], (req, res, params) => {});
TestRunner.run("Should add a route", routes.length, assert.strictEqual, 2);





routes = router.addRoute("endpoint", "/hello/world", ["GET"], (req, res, params) => {});
TestRunner.run("Should replace a route", routes.length, assert.strictEqual, 2);






canary = undefined;
router.addRoute("endpoint", "/hello/world", ["GET"], (req, res, params) => {
    canary = false;
});
router.addRoute("endpoint", "/hello/world", ["GET"], (req, res, params) => {
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





routes = router.addRoute("endpoint", "/hello/world", ["GET", "POST"], (req, res, params) => {});
TestRunner.run("Should allow the same route with different methods", routes.length, assert.strictEqual, 2);




canary = undefined;
routes = router.addRoute("endpoint", "/hello/world/([0-9]+)/(.+)", ["GET"], (req, res, params) => {
    canary = params;
});
router.handleRequest({
    url: "/hello/world/12345/something",
    method: "GET"
});

let result = canary[1] == 12345 && canary[2] === "something";

TestRunner.run("Should extract variables", result, assert.strictEqual, true);
