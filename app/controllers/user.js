var util=require("../common/util");
var User=require("../models/user");
var _=require("underscore");
//保存用户
module.exports.save=function(req,res){
	var userObj=req.body;
	var userId=userObj._id
	if(!!userId){
		User.findOne({_id:userId},function(err,user){
			if(!!err){
				res.json(util.resultObject(false,err.messages));
			}
			if(!user){
				var _user=new User(userObj);
				_user.save(function(err,user){
					if(!!err){
						res.json(util.resultObject(false,err.messages));
					}
					res.json(util.resultObject(true,"",user));
				})
			}else{
				var _user= _.extend(user,userObj);
				_user.save(function(err,user){
					if(!!err){
						res.json(util.resultObject(false,err.messages));
					}
					res.json(util.resultObject(true,"",user));
				})
			}
		})
	}else{
		User.findOne({name:userObj.name},function(err,user){
			if(!!err){
				res.json(util.resultObject(false,err.messages));
			}
			if(!!user){
				res.json(util.resultObject(false,"此用户名已存在"));
			}else{
				var _user;
				_user=new User(userObj)
				_user.save(function(err,user){
					if(!!err){
						res.json(util.resultObject(false,err.messages));
					}
					res.json(util.resultObject(true,"",user));
				})
			}
		})
	}
}
//获取用户列表
module.exports.list=function(req,res){
	User.fetch(function(err,users){
		if(!!err){
			res.json(util.resultObject(false,err.messages));
		}
		res.json(util.resultObject(true,"",users));
	})
}
//删除用户
module.exports.del=function(req,res){
	var id=req.query.id;
	if(id){
		User.findOne({_id:id},function(err,user){
			if(!!err){
				res.json(util.resultObject(false,err.messages));
			}
			if(!user){
				res.json(util.resultObject(false,"此用户已经被删除"));
			}else{
				user.isDelete=true;
				user.save(function(err,user){
					if(!!err){
						res.json(util.resultObject(false,err.messages));
					}
					res.json(util.resultObject(true,"",user));
				})
			}
		})
	}
}