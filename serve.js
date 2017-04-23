var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var unirest = require('unirest')

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

var urls = {
  appAccesToken: "https://graph.facebook.com/oauth/access_token",
  fanpagePosts: "https://graph.facebook.com/" + pageId + "/posts"
};

util.log('GET request: FB api access_token');
unirest.get(urls.appAccesToken)
  .query({
    client_id: '463956137276928',
    client_secret: 'b6dbb81347dfa93bbf63470f064c1fae',
    grant_type: 'client_credentials'
  })
  .end(function(res) {
    if (res.error) {
      console.log('GET error', res.error)
    } else {
      accessToken = res.body.access_token;
      util.log("GET response: Retreived access_token: " + accessToken);
    }
  });

app.get('/getNews', function(req, response) {
  util.log('GET request: getNews');
  unirest.get(urls.fanpagePosts)
    .query({
      access_token: accessToken
    })
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function(res) {
      if (res.error) {
        console.log('GET error', res.error)
      } else {
        util.log("GET response: getNews ");
        response.json(res.body.data);
      }
    });
});

http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('emisti app listening on ' + app.get('ip') + ":" + app.get('port'));
});
