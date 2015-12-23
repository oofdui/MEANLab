module.exports = function(app){
	var user = require("../controllers/user.controllers");
	app.post("/login",user.login);
	app.post("/logout",user.logout);
};