var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.get('/', function(req, res){
  res.render('index.html');
});

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('emisti app listening on ' + app.get('ip') + ":" + app.get('port'));
});