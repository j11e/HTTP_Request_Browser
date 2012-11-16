function getObjectToEnumerate(req, pathname)
{
	var objectToEnumerate = req;
	var targetArray = pathname.split("/");
	do
	{
		targetArray.splice(0,1); // the first element is always "", as urls start by /
	}while(targetArray.length && targetArray[0].length == 0); // just in case the url is badly formatted, like domain////target

	try 
	{
		for(i=0; i<targetArray.length; i+=1) 
		{
			objectToEnumerate = objectToEnumerate[targetArray[i]];
		}
	}
	catch(err)
	{
		objectToEnumerate = null;
	}
	
	return objectToEnumerate;
}

function enumerateTargetObject(targetObject, pathname, res)
{
	var HtmlPrefixString = "<html><head><title>Trololol</title></head> <body> <h2>HTTP request browser</h2><br/>";
	var HtmlSuffixString = "</body></html>";
	var resultString = "";
	var urlPrefix = pathname == "/" ? "" : pathname+'/'; // formatting the links' urls properly to avoid having a terminal /
	if (targetObject === null) 
	{
		resultString += "null";
	}
	else if(typeof targetObject == "string") 
	{
		resultString += (targetObject == "" ? "empty string" : targetObject);
	} 
	else 
	{
		for(property in targetObject)
		{
			if(typeof targetObject[property] == "function") {
				resultString += property+'() <br/>';
			}
			else {
				resultString += '<a href="'+urlPrefix+property+'">'+property+'</a><br/>';
			}
		}
		
		if(resultString == "") 
		{
			resultString = "empty object";
		}
	}

	return HtmlPrefixString + resultString + HtmlSuffixString;
}

function browse(req, res, pathname) 
{
	var htmlRet = enumerateTargetObject(getObjectToEnumerate(req, pathname), pathname, res);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(htmlRet);
	res.end();
}
exports.browse = browse;