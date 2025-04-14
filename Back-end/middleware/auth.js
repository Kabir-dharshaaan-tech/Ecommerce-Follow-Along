
let jwt = require("jsonwebtoken");
require("dotenv").config()
const auth = (req, res, next) => {
   
    const token = req.cookies.accesstoken;  
    console.log(req.cookies)
    if (!token) {
        return res.status(401).json("Token not found");
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json("Invalid or expired token");
        }

        req.user_id = decoded.id;  
        next();
    }); 
};

module.exports = auth;
