const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
      user: "wikitrail@outlook.com",
      pass: "DAM2223+", 
  }});


const sendForgotPasswordEmail = async (email, password)=>{
    await transporter.sendMail({
        from : 'WikiTrail S.L <wikitrail@outlook.com>',
        to : email,
        subject : "Forgot password?",
        html : `<h1> Forgot password?</h1> <p> Your current password is <b>${password}</b></p>`
    })
}


const sendWelcomeEmail = async(email)=>{
    await transporter.sendMail({
        from : 'WikiTrail S.L <wikitrail@outlook.com>',
        to : email,
        subject : "Welcome to WikiTrail!",
        html : `<h1>Welcome to our app!</h1> <p> We're so happy that you trust in our app! Visit the <b>published routes</b> or <b>create one yourself</b> to share it with others!<br> <h4>We are waiting for you!</h4></p>`
    })
}

module.exports = {
    sendForgotPasswordEmail, 
    sendWelcomeEmail
}