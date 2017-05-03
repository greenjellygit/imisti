var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var util = require('util');
var unirest = require('unirest');
var fbConn = require('./rest/FacebookConnector');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/styles/images/favicon/favicon.ico'));

app.get('/', function(req, res) {
  res.render('index.html');
});

require('./rest/NewsRestController.js')(app);
require('./rest/ContactRestController.js')(app);

fbConn.initialize();

http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
  console.log('emisti app listening on ' + app.get('ip') + ":" + app.get('port'));
});
