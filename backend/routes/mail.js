const nodemailer = require('nodemailer');
let express = require('express');
const bodyParser = require('body-parser');

function generateOTP() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }
  
  
  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'srivastwaadarsh@gmail.com', 
      pass: 'hkvw vikl mqdp pcoz'   
    }
  });

  app.post('/confirm',(req,res)=>{

    const otp = generateOTP();

    const mailOptions = {
        from: {
          name: 'Student Council',
          address: 'srivastwaadarsh@gmail.com',
        },
        to: email,
        subject: 'Confirmation of Events participation',
        html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>Use this code to authenticate your login.</p>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending OTP: ' + error);
        }
        res.status(200).send('OTP sent successfully!');
      });

  })

  module.exports =app;