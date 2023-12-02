const asyncHandler =require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../models/userModel")
const registerUser=asyncHandler(async(req, res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
      res.status(400);
      throw new Error("All Fields are Mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
      res.status(400);
      throw new Error("User Already registered!!");
    }
    const hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword);
    res.json({
      message:"Register the user successfully"
    });
  });
const loginUser=asyncHandler(async(req, res)=>{
    res.json({
      message:"login the user successfully"
    });
  });
const currentUser=asyncHandler(async(req, res)=>{
    res.json({
      message:"curr user info"
    });
  });
  module.exports={registerUser,
     loginUser,
     currentUser
}