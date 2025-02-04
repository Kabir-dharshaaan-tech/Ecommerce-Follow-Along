const moongose=require('moongose')


const addressSchema =moongose.schema({
   
   Country:{
        type:String,
        required:true
   },
   State:{
       type:String,
       required:true
   },
   Pincode:{
      type:Number,
      required:true   
   },
   Houseno:{
    type:Number,
     requried:true
   },

   
})



const userSchema=moongose.schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    Password:{
        type: String,
        requried:true
    },
    role:{
        type:String,
        default:"user"
    },
    Address:{
        type: addressSchema,

    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    isActivated:{
         type:Boolean,
         default:false
    }
})


const UserModel=moongose.model("user",userSchema)

module.exports={UserModel}