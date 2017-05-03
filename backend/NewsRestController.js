var fbConn = require('./FacebookConnector');

module.exports = function(app) {
  app.get('/loadNewsPage/:offset/:limit', function(req, response) {
    fbConn.findPosts(req.params.offset, req.params.limit).then(function(data) {
      response.json(data);
    });
  });
}
