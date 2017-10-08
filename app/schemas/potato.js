var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var ObjectId=Schema.Type.ObjectId;

var PotatoSchema=new Schema({
    content:String,
    idDelete:Boolean,
    idOver:Boolean,
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

PotatoSchema.pre("save",function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
})

PotatoSchema.statics={
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

module.exports=PotatoSchema;