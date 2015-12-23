exports.login = function(request,response){
	//express-validator Check
	request.checkBody("email","Invalid Email").notEmpty().isEmail();
	request.sanitizeBody("email").normalizeEmail();//Convert data
	var errors = request.validationErrors();
	if(errors){
		response.render("index",{
			title:"Have an error : "+JSON.stringify(errors),
			isLoggedIn:false
		});
		return;
	}

	console.log(request.body);
	console.log("Email : "+request.body.email);
	console.log("Password : "+request.body.password);

	response.render("index",{
		title:"Logged in as "+request.body.email,
		isLoggedIn:true
	});
};
exports.logout = function(request,response){
	response.render("index",{
		title:"Logout completed",
		isLoggedIn:false
	});
};