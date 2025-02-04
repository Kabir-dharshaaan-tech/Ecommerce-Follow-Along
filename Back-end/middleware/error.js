


module.exports=(err,req,res,next)=>{
     
       err.message =err.message || "internal server error"
       err.statusCode=err.statusCode || 500
       
    
        res.status(err.statusCode).json({status:false,message:err.message})
}