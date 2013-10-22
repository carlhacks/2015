
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/carlhacks');
var db = mongoose.connection;
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Mongo db ready!');
});
var User = mongoose.model('User', {name: String, email: String})

app.get('/', routes.index);

app.get('/users', function (req, res){
  User.find({}, function (error, users){
    if (error) console.log("error!");
    res.render('usersList.jade', {
      title: 'Users',
      users: users,
    });
  });
});

app.post('/users/new', function (req, res) {
  var user = new User({
      name: req.param('name'),
      email: req.param('email')
  });
  user.save(function (error, user) {
    if(error) console.log("error!");
  });
  res.redirect('/');
})


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
