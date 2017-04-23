var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fb = require('fb');
var util = require('util');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));

app.get('/', function(req, res) {
  res.render('index.html');
});

var pageId = "284449561997051";
var accessToken = null;

fb.api('oauth/access_token', {
  client_id: '463956137276928',
  client_secret: 'b6dbb81347dfa93bbf63470f064c1fae',
  grant_type: 'client_credentials'
}, function(res) {
  if (!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  accessToken = res.access_token;
  util.log("retreived access_token: " + accessToken);
});

app.get('/getNews', function(req, res) {
  util.log("REST: getNews() called");

  fb.api(pageId + "/posts?access_token=" + accessToken,
    function(response) {
      res.json(response.data);
    }
  );

});

http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('emisti app listening on ' + app.get('ip') + ":" + app.get('port'));
});
