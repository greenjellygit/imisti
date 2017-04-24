var fbConn = require('./FacebookConnector');

module.exports = function(app) {
  app.get('/getNews', function(req, response) {
    fbConn.findPosts().then(function(data) {
      response.json(data);
    });
  });
}
