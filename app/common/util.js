module.exports.resultObject=function(isSuccess,msg,data){
	return {
		success:!!isSuccess,
		msg:msg||"",
		data:data||null
	}
}