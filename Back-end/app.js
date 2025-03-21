


const express = require("express");
const cors = require("cors");
const app = express();
const path=require("path")
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const { catchAsyncError } = require("./middleware/catchAsyncError");
const { ErrorHandler } = require("./utils/errorHandler");
const errMiddleware = require("./middleware/error");
const userRouter = require("./controllers/userRoute");  
const productRouter=require("./controllers/productRoutes")

app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

app.use("/user", userRouter);
app.use("/product",productRouter);

app.use(errMiddleware);

module.exports = { app };
