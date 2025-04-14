const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
const ErrorMiddleware= require("./middleware/error")
const path=require("path")
const cookieParser =require("cookie-parser")
app.use(cookieParser())

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

const {userRoute} = require('./controllers/userRoute');

const productRouter = require("./controllers/productRoutes");
const orderRouter =require("./controllers/orderRoute")


app.get("/test", async (req, res) => {
  res.send("hello.....");
});


console.log(path.join(__dirname, 'uploadproducts'))


app.use('/profile-photo', express.static(path.join(__dirname, 'upload')));

app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

app.use("/user",userRoute)
app.use("/product", productRouter);
app.use("/order",orderRouter)




app.use(ErrorMiddleware)

module.exports = { app };