var User=require("../app/controllers/user");
var Multiparty=require("connect-multiparty");
var multipartMiddleware =Multiparty();

module.exports=function(app){
	//获取用户信息
	app.use(function(req,res,next){
		var _user=req.session.user;
		res.locals.user=_user;
		next();
	})

	//用户
	app.get("/server/user/list",User.list)
	app.post("/server/user/save",User.save)
	app.post("/server/user/del",User.del)
}