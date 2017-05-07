var nodemailer = require('nodemailer');
var config = require('./Configuration.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_SENDER_NAME,
    pass: config.MAIL_SENDER_PASSWORD
  }
});

var mailOptions = {
  to: 'emiliajaroszewska@imisti.pl',
};

function prepareEmail(emailData) {
  var newEmail = {
    from: emailData.name,
    to: mailOptions.to,
    subject: emailData.subject,
    text: "Od " + emailData.email + ": " + emailData.text,
    html: "Od " + emailData.email + ": " + emailData.text
  }
  return newEmail;
}

function sendEmail(emailData) {
  var email = prepareEmail(emailData);
  transporter.sendMail(email, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Email from %s sent: %s', email.from, info.response);
  });
}

module.exports = {
  sendEmail: sendEmail
};
