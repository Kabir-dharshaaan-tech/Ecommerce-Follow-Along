

const express= require("express")

const app=express()
app.use(express.json())


const{catchAsyncError} =require("./middleware/catchAsyncError")
const {ErrorHandler} =require("./utils/errorHandler")
const errMiddleware =require("./middleware/error")
const userRouter=require("../Back-end/controllers/userRoute")


app.use("/user",userRouter)






app.use(errMiddleware)

module.exports={app}