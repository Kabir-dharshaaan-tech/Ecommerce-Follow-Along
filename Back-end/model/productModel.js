let mongoose = require("mongoose")

const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true,
        default:[]
    },
    email:{
        type:String,
        required:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,'Please enter a valid email address']
        
    
    }
},

{
    timestamps: true
}
);


ProductModel= mongoose.model("Product", productSchema)
module.exports= ProductModel