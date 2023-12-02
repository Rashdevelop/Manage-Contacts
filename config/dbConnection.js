const mongoose=require("mongoose");
const db_connect=async()=>{
  try{
     const connect=  await mongoose.connect(process.env.DB_URI,{
        dbName:"my_contacts",
     });
     console.log("databse connected");
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}
module.exports=db_connect;