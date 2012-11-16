var http = require("http");
var url = require("url");

function start(port, requestRouter, rules) {
	http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		
		var pathname = url.parse(req.url).pathname;
		requestRouter.routeRequest(pathname, req, rules, res);
	}).listen(port, '127.0.0.1');

	console.log("Server running at http://127.0.0.1:"+port);
}

exports.start = start;