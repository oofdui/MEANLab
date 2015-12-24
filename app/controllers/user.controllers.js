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

	if(request.body.remember == "remember"){
		request.session.remember = true;
		request.session.email = request.body.email;
		request.sessionOptions.maxAge = 60000;//60000 milliseconds
		request.session.cookie.maxAge = 60000;
	}

	response.render("index",{
		title:"Logged in as "+request.body.email,
		isLoggedIn:true
	});
};
exports.logout = function(request,response){
	request.session = null;
	response.render("index",{
		title:"Logout completed",
		isLoggedIn:false
	});
};