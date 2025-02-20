const express=require('express')
const {UserModel}=require("../models/useModel")
const bcrypt =require('bcrypt')
require('dotenv').config()
const{catchAsyncError} =require("../middleware/catchAsyncError")
const {ErrorHandler} =require("../utils/errorHandler")
const {sendMail}=require("../utils/mail")
const jwt=require("jsonwebtoken")
const upload =require("../middleware/multer")
const userRouter=express.Router()

userRouter.post("/signup",catchAsyncError(async(req,res,next)=>{

      
           const{name,email,password}= req.body
            if(!name || !email || !password){
              next(new ErrorHandler("requried",400))
            }
            let user= await UserModel.findOne({email})
            if(user){
                next(new ErrorHandler("user is already signed, go with login",200))
            }
            
            bcrypt.hash(password, 5, async(err, hash) =>{
                 if(err)
                 {
                    next(new ErrorHandler("internal server error",500))
                 }

                 let newuser=new UserModel({email,name,password:hash})

                

                 let token=jwt.sign({id:newuser._id}, process.env.secrete, { expiresIn: 60 * 60*60*10 });

                 let activation_url=`http://localhost:${process.env.PORT}/user/activation/${token}`

                  await sendMail(
                    {
                      email:newuser.email,
                      subject:"Activate your account",
                      message:`Hello ${newuser.name},please click on the link to activate your acccount: ${activation_url}`,
                    }
                  )
                  await newuser.save()

                  res.status(200).json({status:true,message:"registration successfull please activate your account"})
                 
            });

     
}))


userRouter.get("/activation/:token",catchAsyncError(async(req,res,next)=>{
        
          let token=req.params.token
          if(!token){
                next(new ErrorHandler("token not found",404))
          }
           jwt.verify(token,process.env.secrete,async(err,decoded)=>{
                 if(err){
                      next(new ErrorHandler("token is not valid", 400))
                 }
                 let id=decoded.id

                 await UserModel.findByIdAndUpdate(id,{isActivated:true})

                 res.status(200).json({message:"is Activated"})
           })

}))


userRouter.post("/upload",upload.single("photo"),catchAsyncError(async(req,res,next)=>{
      
       if(!req.file){
        next(new ErrorHandler("File not found",400))
       }

       res.status(200).json("File uploaded Sucessfuly")
}))


userRouter.post('/login',catchAsyncError(async(req,res,next)=>{
       
      const {email,password}=req.body;

      if(!email || !password)
      {
            next(new ErrorHandler("email and password is required",400))
      }
      
       let user=await UserModel.findOne({email})

       if(!user)
       {
            next(new ErrorHandler("please signup before login",400));
       }
       if(!user.isActivated)
       {
            next(new ErrorHandler("please activate before login",400));
       }

       bcrypt.compare(password, user.password, function(err, result) {
          if(err){
               next(new ErrorHandler("internal server error",500)); 
          }
          if(!result){
               next(new ErrorHandler("password is incorrect",400));
          }

          let token =jwt.sign({id:user._id},process.env.ACCESS,{expiresIn: 60*60*60*60*24*30})
      
          res.cookie("accesstoken",token,{
               httpOnly:true,
               MaxAge:"7d"
          })
   
          res.status(200).json({status:true,message:"login successful"})
          
      });



      
}))


module.exports=userRouter