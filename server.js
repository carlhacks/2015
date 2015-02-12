/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , myDb = require('./myDb')
  , User = myDb.User;


mongoose.connect('mongodb://localhost/carlhacks');
var db = mongoose.connection;

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.methodOverride());

app.configure(function () {
  app.use(express.bodyParser());
  app.use(app.router);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB open and ready');
});

// set up all routing
routes.setup(app, User);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});