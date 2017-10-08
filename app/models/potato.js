var mongoose=require("mongoose")
var PotatoSchemas=require("../schemas/potato")
var Potato=mongoose.model("Potato",PotatoSchemas);

module.exports=Potato;