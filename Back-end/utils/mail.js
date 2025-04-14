const nodemailer = require("nodemailer");

require("dotenv").config()
const sendMail=async(options)=>{
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.ADMIN_NAME,
    pass: process.env.ADMIN_PASSWORD
  },
});

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to:options.email,
    subject:options.subject,
    text:options.message,
  })





}

module.exports={sendMail}