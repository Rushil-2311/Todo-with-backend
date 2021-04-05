const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
require('./user');  
const userSchema=new mongoose.Schema({
    TODO:{
       type:String,
       required:true
    },  postedBy:{
        type:ObjectId,
        ref:"User"
     }
})

mongoose.model("Todo",userSchema);