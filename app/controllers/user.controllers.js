var User = require("mongoose").model("User");

exports.create = function(request,response,next){
	var user = new User(request.body);
	user.save(function(err){
		if(err){
			return next(err);
		}
		else{
			response.json(user);
		}
	});
};
exports.list = function(request,response,next){
	/*## Other Argument
	User.find({conditions},[Fields],[Options],function(err,users){});

	User.find({},
		"firstName lastName",{skip:10,limit:10},function(err,users){

	User.find({
		firstName:"nithi",
		age:{$gt:18,$lt:60},
		interests:{$in:["reading","movies"]}
	},"firstName lastName",{skip:10,limit:10},function(err,users){
	*/
	/*## Chance Format
	User.find({firstName:"Nithi"})
		.where("age").gt(18).lt(60)
		.where("interests").in(["reading","movies"])
		.skip(10)
		.limit(10)
		.select("firstName lastName")
		.exec(function(err,users){

	});
	*/
	User.find({},function(err,users){
		if(err){
			return next(err);
		}
		else{
			response.json(users);
		}
	});
};
exports.userByUsername = function(request,response,next,username){
	User.findOne({
		username:username
	},function(err,user){
		if(err){
			return next(err);
		}
		else{
			request.user = user;
			next();//ให้ตัวถัดไปทำงาน
		}
	});
};
exports.read = function(request,response){
	response.json(request.user);
}
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
