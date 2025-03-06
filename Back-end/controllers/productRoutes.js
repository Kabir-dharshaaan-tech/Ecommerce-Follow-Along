




const express = require("express");
const ProductModel = require("../models/productModel");
const { catchAsyncError } = require("../middleware/catchAsyncError");
const { ErrorHandler } = require("../utils/errorHandler");
const { UserModel } = require("../models/useModel");
const { productUpload } = require("../middleware/multer");
const path = require("path");

const productRouter = express.Router();

// ✅ Create Product API
productRouter.post("/createProduct", productUpload.array("images", 10), catchAsyncError(async (req, res, next) => {
    const { email, name, description, category, tags, price, stock } = req.body;

    if (!email || !name || !description || !category || !tags || !price || !stock || !req.files) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const images = req.files.map((file) => file.path);
    if (images.length === 0) {
        return next(new ErrorHandler("At least one image is required", 400));
    }

    const formattedTags = typeof tags === "string" ? tags.split(",").map(tag => tag.trim()) : tags;

    const product = new ProductModel({
        email,
        name,
        description,
        category,
        tags: formattedTags,
        price,
        images,
        stock,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully" });
}));

// ✅ Get All Products API
productRouter.get("/allproduct", catchAsyncError(async (req, res, next) => {
    let allProduct = await ProductModel.find();

    if (allProduct && allProduct.length > 0) {
        allProduct = allProduct.map((product) => ({
            ...product.toObject(), 
            images: product.images.map((ele) => path.basename(ele)), 
        }));
    }

    res.status(200).json({ status: true, message: allProduct });
}));

// ✅ Update Product API
productRouter.put("/update/:id", catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ message: "Product updated successfully", product });
}));

// ✅ Delete Product API
productRouter.delete("/delete/:id", catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ message: "Product deleted successfully" });
}));

module.exports = productRouter;

