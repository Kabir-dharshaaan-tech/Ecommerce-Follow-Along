



module.exports=(err,req,res,next)=>{
  console.log(err)
  err.statusCode=err.statusCode ||500
  err.message=err.message || "internal server error"

  res.status(err.statusCode).json({
    success:false,
    message:err.message
  })
}