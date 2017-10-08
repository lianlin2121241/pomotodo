var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var ObjectId=Schema.Type.ObjectId;

var TomatoSchema=new Schema({
    content:String,
    idDelete:Boolean,
    user:{type:ObjectId,ref:"User"},
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

TomatoSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
})

TomatoSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort("meta.updateAt")
            .exec(cb);
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports=TomatoSchema;