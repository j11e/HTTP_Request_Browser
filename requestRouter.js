function routeRequest(pathname, req, rules, res) 
{
	if (typeof rules[pathname] === 'function')
	{
		rules[pathname](req, res, pathname);
	} 
	else
	{
		rules["default"](req, res, pathname);
	}
}

exports.routeRequest = routeRequest;