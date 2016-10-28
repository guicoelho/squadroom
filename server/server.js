var firebase = require('firebase');
var fs = require('fs');
var PeerServer = require('peer').PeerServer;

// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: "https://squadroom-8add6.firebaseio.com"
});
var db = firebase.database();


var server = PeerServer({
  port: 9000,
  path: '/squadroom',
  ssl: {
    key: fs.readFileSync('/etc/ssl/squadroom/squadroom.key', 'utf8'),
    cert: fs.readFileSync('/etc/ssl/squadroom/squadroom.crt', 'utf8')
  }
});


server.on('connection', function(id) {
	db.ref('main/' + id).set({
		'online': true
	});
	console.log('User connected: ' + id);
});

server.on('disconnect', function(id) {
	db.ref('main/' + id).remove();
	console.log('User disconnected: ' + id);
});