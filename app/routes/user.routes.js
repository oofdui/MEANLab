module.exports = function(app){
	var user = require("../controllers/user.controllers");
	app.post("/login",user.login);
	app.post("/logout",user.logout);
	app.route("/user")
		.post(user.create)
		.get(user.list);

	app.route("/user/:username").get(user.read);
	app.param("username",user.userByUsername);//ทำตัวนี้ก่อน ซึ่งมันจะไปสร้างค่า Request.User ให้ก่อน
};
