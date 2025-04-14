const {app} =require("./app")
require("dotenv").config()

const connection =require("./db/connection")

const userRoute = require('./controllers/userRoute');


app.get("/test",async(req,res)=>{
    res.send("hello......")
})


const port = process.env.PORT
app.listen(port,async()=>{
    try {
        await connection
        console.log(`app is running on http://localhost:${port}`)
    } catch (error) {
         console.log(error)
    }
   
})