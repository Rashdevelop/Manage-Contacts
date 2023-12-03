const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const validateToken=asyncHandler(async(req,res,next)=>{
            let token;
            let authHeader=req.headers.Authorization || req.headers.authorization;
            if(authHeader && authHeader.startsWith("bearer")){
               token=authHeader.split(" ")[1];
               jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
                  if(err){
                    res.status(401);
                    throw  new Error("User is Not Authorized");
                  }
                  console.log("decoded");
                  req.user=decoded.user;
                  next();
               });
               if(!token){
                res.status(401);
                throw new Error("Unauthorized User or Token is Missing!!");
               }
            }
});
module.exports=validateToken;