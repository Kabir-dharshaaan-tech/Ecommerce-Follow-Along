let express=require("express")
const ProductModel  = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler=require("../utils/errorhadler")
const orderRouter= express.Router()
const UserModel = require("../model/userModel")
const auth = require("../middleware/auth")
const orderModel = require("../model/orderModel")
const mongoose=require("mongoose")




orderRouter.post("/place-order", auth, catchAsyncError(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      let userId = req.user_id;
     
      if (!userId) {
        return next(new Errorhadler("User ID not found", 400));
      }
  
      let user = await UserModel.findById(userId);
      let mailId = user.email;
      let userName = user.name;
  
      const { orderItems, shippingAddress, totalAmount } = req.body;
  
      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return next(new Errorhadler("At least one order item is required", 400));
      }
  
      for (let item of orderItems) {
        if (!item.product || !item.quantity || !item.price) {
          return next(new Errorhadler("Each order item must include product, quantity, and price", 400));
        }
        if (item.quantity < 1) {
          return next(new Errorhadler("Quantity cannot be less than 1", 400));
        }
        if (item.price < 0) {
          return next(new Errorhadler("Price cannot be negative", 400));
        }
      }
  
      if (!shippingAddress ||
          !shippingAddress.country ||
          !shippingAddress.city ||
          !shippingAddress.address ||
          !shippingAddress.pincode ||
          !shippingAddress.addressType) {
        return next(new Errorhadler("All shipping address fields are required (country, city, address, pincode, addressType)", 400));
      }
  
      if (typeof totalAmount !== "number" || totalAmount <= 0) {
        return next(new Errorhadler("Total amount must be a positive number", 400));
      }
  
    
      const orderPromises = orderItems.map(async (item) => {
        const totalAmount = item.price * item.quantity;
        let newOrder = new orderModel({
          orderItems: [item],
          shippingAddress,
          totalAmount,
          user: userId,
        });
        return newOrder.save({ session }); 
      });
  
      await Promise.all(orderPromises);
  
      await UserModel.findByIdAndUpdate(userId, { cart: [] }, { session });
  
      await session.commitTransaction();
      session.endSession();
  
    //   await sendMail({
    //     email: mailId,
    //     subject: "Order placed successfully",
    //     message: `Hello ${userName}, your order has been placed successfully.`,
    //   });
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully"
      });
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new Errorhadler(error.message, 400));
    }
  }));


  
  orderRouter.get("/my-order", auth, catchAsyncError(async (req, res, next) => {
      let userId = req.user_id;
      if (!userId) {
        return next(new Errorhadler("User ID not found", 400));
      }
      const orders =await orderModel.find({
                                           user:userId,
                                           orderStatus: { $in: ["Processing", "Shipped"] }
                                          }
                                        ).populate(
                                            {path:"orderItems.product"}
                                         ).select("orderItems")

      res.status(200).json({
        success: true,
        message: orders
      })

        
  }));


  orderRouter.patch("/cancell-order/:id", auth, catchAsyncError(async (req, res, next) => {
      
        let id=req.params.id
        if(!id){
            return next(new Errorhadler("ID not found", 400));
        }

        await orderModel.findByIdAndUpdate(id,{orderStatus:"Cancelled"})

        res.status(200).json({
            success: true,
            message: "cancelled the order"
        })  
  }));






  





  module.exports=orderRouter
  