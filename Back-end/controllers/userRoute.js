








const express = require("express");
const { UserModel } = require("../models/useModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { catchAsyncError } = require("../middleware/catchAsyncError");
const { ErrorHandler } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const { upload } = require("../middleware/multer");

const userRouter = express.Router();


const SECRET_KEY = process.env.SECRET_KEY || "default_secret";


userRouter.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists. Please login.", 400));
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return next(new ErrorHandler("Internal server error", 500));
      }

      let newUser = new UserModel({ email, name, password: hash });
      await newUser.save();

      res.status(200).json({ status: true, message: "Signup successful. Please login." });
    });
  })
);


userRouter.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found. Please sign up first.", 400));
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return next(new ErrorHandler("Internal server error", 500));
      }
      if (!result) {
        return next(new ErrorHandler("Incorrect password", 400));
      }

      console.log("✅ Password Matched:", result);

      let token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30d" });

      res.cookie("accesstoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ status: true, message: "Login successful", token });
    });
  })
);

module.exports = userRouter;
