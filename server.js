/**
 * Module dependencies.
 */

var express = require('express')
  , multer = require('multer')
  , errorHandlers = require('./errors.js')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , myDb = require('./myDb')
  , User = myDb.User;


mongoose.connect('mongodb://localhost/carlhacks');
var db = mongoose.connection;

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.fieldname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  },
  onError: function (error, next) {
    console.log(error);
    next(error);
  }
}));

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB open and ready');
});

// handle errors
app.use(errorHandlers.logger);
app.use(errorHandlers.ajax);
app.use(errorHandlers.endOfWorld);

// set up all routing
routes.setup(app, User);

app.use(errorHandlers.send404);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});
