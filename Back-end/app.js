

const express= require("express")

const app=express()
app.use(express.json())


const{catchAsyncError} =require("./middleware/catchAsyncError")
const {ErrorHandler} =require("./utils/errorHandler")
const errMiddleware =require("./middleware/error")





app.post("/create" , catchAsyncError(async(req,res,next)=>{
         

         const {email,password}=req.body
        
        if(!email || !password){
            next(new ErrorHandler("required",400))
        }
        else{
            res.status(200).json({status:"true",message:"uuuuuuuuu"})
    
        }
    
}))



app.use(errMiddleware)

module.exports={app}