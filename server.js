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


app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    return res.status(404).render('errors', {
      status: 404,
      heading: 'Page not found',
      msg: 'Sorry, the page ' + req.url + ' doesn\'t seem to exist.'
    });
  }

  // respond with json
  if (req.accepts('json')) {
    return res.send({ error: 'Not found' });
  }

  // default to plain-text
  res.type('txt').send('Not found');
});

// set up all routing
routes.setup(app, User);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});