let multer=require("multer")
let path=require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../upload"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
      cb(null, file.fieldname + '-' + uniqueSuffix+".png")
    }
  })

  const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../uploadproducts"))
      console.log(path.join(__dirname,"../uploadproducts"),"+++++++++++++++++++++++++")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
      cb(null, file.fieldname + '-' + uniqueSuffix+".png")
    }
  })

  const productUpload = multer({ storage: productStorage })
  
  const upload = multer({ storage: storage })

  module.exports={upload,productUpload};
  