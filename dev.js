var express = require('express');
var path    = require("path");

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/ssl/squadroom/squadroom.key', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/squadroom/squadroom.crt', 'utf8');



var app = express();
var credentials = {key: privateKey, cert: certificate};

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/video.html'));
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);