var express = require("express");
var morgan = require("morgan");
var compression = require("compression");
var bodyParser = require("body-parser");

//Set SASS
var sass = require("node-sass-middleware");
//Set Validator
var validator = require("express-validator");

module.exports = function(){
	var app = express();

	//Set Default View Folder & Template Engine
	app.set("views","./app/views");
	app.set("view engine","jade");

	//Check Environment Variable (Setting by command : 'export NODE_ENV=development' OR 'export NODE_ENV-production')
	if(process.env.NODE_ENV == "development"){
		app.use(morgan("dev"));
		console.log("Development Mode");
	}
	else{
		app.use(compression);
		console.log("Production Mode");
	}
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	
	app.use(validator());//Set Validator, Muse use after app.use(bodyParser) soon
	app.use(sass({src:"./sass",dest:"./public/css",outputStyle:"compressed",prefix:"/css",debug:true}));//Set Default Value of SASS (src=SourceFile , dest=CompileToFolder , outputStyle=compressed compact expanded , prefix=Default Path of CSS File) * Must use before set static folder
	app.use(express.static("./public"));//Set Default Static Folder

	require("../app/routes/index.routes")(app);
	require("../app/routes/user.routes")(app);
	return app;
}