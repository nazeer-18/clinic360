const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});

const sendEmail = async(to,subject,text)=>{
    try{
        await transporter.sendMail({
            from : `"Arogo AI Clinic 360" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });
        console.log(`email sent to ${to}`);
    }catch(error){
        console.error('email sending failed', error.message);
    }
};

module.exports = sendEmail;