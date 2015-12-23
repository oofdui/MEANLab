exports.render = function(request,response){
	response.render("index",{
		"title":"Hello World",
		"message":"Hi Fucking Hero."
	});
}