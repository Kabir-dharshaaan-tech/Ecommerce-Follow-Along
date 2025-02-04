const express=require('express')
const {UserModel}=require('UserModel')
const bcrypt =require('bcrypt')
const userRouter=express.Router()
const{catchAsyncError} =require("../middleware/catchAsyncError")
const {ErrorHandler} =require("../utils/errorHandler")
const {sendMail}=require("../utils/mail")

userRouter.post("/signup",catchAsyncError(async(req,res)=>{

      
           const{name,email,password}= req.body
            if(!name || !email || !password){
              next(new ErrorHandler("requried",400))
            }
            let user=UserModel.findOne({email})
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

                 let activation_url=`http://localhost:8052/user/activation/${token}`

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