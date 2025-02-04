const nodemailer =require("nodemailer");
const dotenv=require("dotenv");
const sendMail=async(options)=>{
    const transporter=nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,

        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        },
    });

    await transporter.sendMail({
        form:process.env.SMTP_USER,
        to:options.email,
        subject:options.subject,
        text:options.message,
    })
}


module.exports={sendMail}