/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/carlhacks');
var db = mongoose.connection;
var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({
  keepExtensions: true,
  uploadDir: '/tmp/uploads'
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB open and ready');
});
var myDb = require('./myDb');
var User = myDb.User;
var Project = myDb.Project;

app.get('/', function(req, res){
  User.count({}, function( err, count){
    res.render('index', { title: 'CarlHacks', count: count });
  })
});

app.get('/count', function(req, res){
  User.count({}, function( err, count){
    res.send({ count: count });
  })
});

app.get('/users', function (req, res){
  if (req.url==='/users?password=carlhacks9000'){
    User.find({}, function (error, users){
      if (error) console.log("error!");
      res.render('usersList.jade', {
        title: 'Users',
        users: users,
      });
    });
  }else{
    res.redirect('/');
  }
});

app.get('/submit', function (req, res) {
  res.render('submit.jade', {
    title: 'Submit'
  });
});

app.post('/users/new', function (req, res) {
  var user = new User({
      name: req.body.user.name,
      email: req.body.user.email,
      bracket: req.body.user.bracket,
      needTeam: req.body.user.need_team, 
      teamName: req.body.user.team_name, 
      teamMates: req.body.user.team_members
  });
  user.save(function (error, user) {
    if(error) console.log("error!");
  });
  res.redirect('/');
})


// File upload
app.post('/upload', function(req, res) {
  console.log('Received image upload: %s saved to %s',
    req.files.image.name,
    req.files.image.path);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
