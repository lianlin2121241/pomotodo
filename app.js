var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var mongoose=require("mongoose");
var cookieParser=require("cookie-parser");
var session=require("express-session");
var mongoStore=require("connect-mongo")(session);
var logger=require("morgan");
var port=process.env.PORT||3000;
var app=express();

var dbUrl="mongodb://127.0.0.1:27017/pomotodo";

app.locals.moment=require("moment");
//引入bodyParser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//引入session中间件
app.use(cookieParser());
app.use(session({
	secret:"pomotodo",
	store:new mongoStore({
		url:dbUrl,
		collection:"sessions"
	})
}))
app.use(express.static(path.join(__dirname,"public")));

if("development"==app.get("env")){
	app.set("showStackError",true);
	app.use(logger(":method :url :status"));
	app.locals.pretty=true;		//这是文本为非格式化文本
	mongoose.set("debug",true);	//设置mongoose调试打开
}

app.listen(port);
console.log("pomotodo started on port"+port);
mongoose.connect(dbUrl)

require("./config/routes")(app);