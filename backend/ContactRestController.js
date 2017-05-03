var mailerService = require('./MailerService');

module.exports = function(app) {
  app.post('/sendEmail', function(req, response) {
    mailerService.sendEmail(req.body);
    response.end();
  });
}
