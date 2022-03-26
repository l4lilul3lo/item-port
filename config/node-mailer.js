const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function generateReminderHtml() {
  return `<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  </head>
  
  <body>
    <h1>Hello</h1>
    <h4>We noticed you tried to register again. You already have an account with us!</h4>
  
    <h4>You can log in <a href="http://localhost:3000/login">here</a></h4>
  
    <h4>If this wasn't you it was a bot, or someone mistyped their own email. In that case, you can ignore this email.</h4>
  
  </body>
  
  </html>`;
}

function generateVerificationHtml(token) {
  return `

  
  
    <h1>Hello</h1>
    <h4>Verify your email by clicking on the link below!</h4>
    <h4>This link expires in 15 minutes</h4>
    <a href="http://localhost:4000/verify/${token}/?verifyMethod=email">Verify email</a>
  
  `;
}

function generateConfirmedHtml() {
  return `<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <meta http-equiv="refresh" content="5; URL=http://localhost:3000/login" />
  
    <style>
      #redirect:after {
        content: "";
        animation: dots 2s infinite;
        font-size: 25px;
      }
  
      @keyframes dots {
        0% {
          content: "";
        }
  
        25% {
          content: ".";
        }
  
        50% {
          content: "..";
        }
  
        75% {
          content: "...";
        }
  
        100% {
          content: "...";
        }
      }
    </style>
  </head>
  
  <body>
    <h1>Your account has been Verified! If you're not redirected within 5 seconds please click the link below</h1>
  
    <div id="redirect">Redirecting to login</div>
    </br>
    <a href="http://localhost:3000/login">Link to login</a>
  
    
  </body>
  
  </html>`;
}

function generateMailOptions(email, subject, html) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: `${email}`,
    subject: subject,
    html: html,
  };
  return mailOptions;
}

module.exports = {
  transporter,
  generateReminderHtml,
  generateVerificationHtml,
  generateMailOptions,
  generateConfirmedHtml,
};
