var nodemailer = require('nodemailer');
var config = require('./Configuration.js');

var transporter = nodemailer.createTransport({
  host: config.MAIL.HOST,
  port: config.MAIL.PORT,
  auth: {
    user: config.MAIL.SENDER_NAME,
    pass: config.MAIL.SENDER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

function prepareEmail(emailData) {
  var newEmail = {
    from: config.MAIL.SENDER_NAME,
    to: config.MAIL.RECEIVERS_LIST,
    subject: "[Formularz kontaktowy] " + emailData.subject,
    text: "Imię nadawcy: " + emailData.name + "<br>Adres nadawcy: " + emailData.email + "<br><br>" + emailData.text,
    html: "<b>Imię nadawcy:</b> " + emailData.name + "<br><b>Adres nadawcy:</b> " + emailData.email + "<br><br>" + emailData.text
  }
  if (emailData.attachments.length > 0) {
    newEmail.attachments = emailData.attachments;
  }
  return newEmail;
}

function sendEmail(emailData) {
  var email = prepareEmail(emailData);
  transporter.sendMail(email, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Email from %s sent: %s', emailData.email, info.response);
  });
}

module.exports = {
  sendEmail: sendEmail
};
