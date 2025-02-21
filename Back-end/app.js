

const express= require("express")
const cors =require('cors')
const app=express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}))


const{catchAsyncError} =require("./middleware/catchAsyncError")
const {ErrorHandler} =require("./utils/errorHandler")
const errMiddleware =require("./middleware/error")
const userRouter=require("../Back-end/controllers/userRoute")


app.use("/user",userRouter)






app.use(errMiddleware)

module.exports={app}