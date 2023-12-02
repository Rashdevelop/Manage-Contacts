const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
      username:{
        type:String,
        required:[true,"please enter user name"],
      },
      email:{
        type:String,
        required:[true,"mail id is mandatory"],
        unique:[true,"email address has benn taken"],
      },
     password:{
        type:String,
        required:[true,"kindly add password"],
     },

},{
    timestamps:true,
})
module.exports=mongoose.model("User",userSchema);