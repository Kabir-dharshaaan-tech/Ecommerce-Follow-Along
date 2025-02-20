const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
   Country: {
      type: String
   },
   State: {
      type: String
   },
   Pincode: {
      type: Number
   },
   Houseno: {
      type: Number
   },
});

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: "user"
   },
   Address: {
      type: addressSchema,
   },
   createAt: {
      type: Date,
      default: Date.now
   },
   isActivated: {
      type: Boolean,
      default: false
   }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel};
