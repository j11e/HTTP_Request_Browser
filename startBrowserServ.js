var authServer = require("./browserServer");
var requestRouter = require("./requestRouter");
var requestHandlers = require("./requestHandlers");

var rules = {};
rules["/"] = requestHandlers.browse;
rules["default"] = requestHandlers.browse;

authServer.start(1337, requestRouter, rules);