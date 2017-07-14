const assert = require("assert"),
    TestRunner = require("../helpers/TestRunner"),
    Router = require("./Router");

let router = new Router(),
    routes,
    canary,
    mockReq = {
        url: "/hello/world",
        method: "GET"
    };

routes = router.addRoute("/hello/world", "GET", (req, res, params, callback) => {});
TestRunner.run("Should add a route", routes.length, assert.strictEqual, 7);





routes = router.addRoute("/hello/world", "GET", (req, res, params, callback) => {});
TestRunner.run("Should replace a route", routes.length, assert.strictEqual, 7);






canary = undefined;
router.addRoute("/hello/world", "GET", (req, res, params, callback) => {
    canary = false;
});
router.addRoute("/hello/world", "GET", (req, res, params, callback) => {
    canary = true;
});
router.handleRequest(mockReq);

TestRunner.run("Should update the handler", canary, assert.strictEqual, true);





let res = {}
router.handleRequest({
    url: "/i/dont/exist",
    method: "GET"
}, res);
TestRunner.run("Should 404 if no matching route", res.statusCode, assert.strictEqual, 404);





routes = router.addRoute("/hello/world", "POST", (req, res, params, callback) => {});
TestRunner.run("Should allow the same route with different methods", routes.length, assert.strictEqual, 8);




canary = undefined;
routes = router.addRoute("/hello/world/([0-9]+)/(.+)", "GET", (req, res, params, callback) => {
    canary = params;
});
router.handleRequest({
    url: "/hello/world/12345/something",
    method: "GET"
});

let result = canary[1] == 12345 && canary[2] === "something";

TestRunner.run("Should extract variables", result, assert.strictEqual, true);


