
const connection=require('./db/connection')
const {app}=require("./app")
require("dotenv").config()
const port= process.env.PORT || 8050

app.get("/testing",async(req,res)=>{
     
    res.send("hello")
})

connection
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(port, () => console.log(`🚀 App is running on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });