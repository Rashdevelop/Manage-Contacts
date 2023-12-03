const asyncHandler =require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel")
//-----------user ragisteration----------
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
    const hashedPassword=await bcrypt.hash(password,10);
    const user=User.create({
      username,
      email,
      password:hashedPassword
    });
    if(user){
      console.log("user created");
      res.status(201).json({
        _id:user._id,
        email:user.email
      });
    }else{
      res.status(400);
      throw new Error("User data is not valid");
    }
  });
  //-----------user login----------
const loginUser=asyncHandler(async(req, res)=>{
   const {email, password}=req.body;
   if(!email || !password){
     res.status(400);
     throw new Error("All Fields are mandatory");
   }
   const user=await User.findOne({email});
   if(user && (bcrypt.compare(password, user.password))){
    const accessToken=jwt.sign({
        user:{
          username:user.username,
          email:user.email,
          id:user.id,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:"1m"
    }
    )
    res.status(200).json({accessToken});
  }else{
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
  });
const currentUser=asyncHandler(async(req, res)=>{
  res.json(req.user);
  });
  module.exports={registerUser,
     loginUser,
     currentUser
}