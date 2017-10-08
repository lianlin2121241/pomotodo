var mongoose=require("mongoose")
var TomatoSchemas=require("../schemas/tomato")
var Tomato=mongoose.model("Tomato",TomatoSchemas);

module.exports=Tomato;