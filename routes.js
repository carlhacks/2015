var mongoose = require('mongoose')
  , saveUser = require('./handleUser').saveUser;

module.exports.setup = function (app, User) {
  app.get('/', function(req, res){
    User.count({}, function( err, count){
      res.render('index', {
        title: 'CarlHacks',
        count: count,
        additional_js: ['index.js']
      });
    })
  });

  app.get('/favicon.ico', function (req, res) {
    res.sendFile('img/favicon.png', {root: './public'});
  });

  app.get('/count', function(req, res){
    User.count({}, function( err, count){
      res.send({ count: count });
    })
  });

  app.get('/register', function(req, res){
    res.render('form', {
      title: 'CarlHacks - Register',
      user: {},
      actionSent: 'Register for CarlHacks',
      additional_js: ['fileUpload.js']
    });
  });

  app.get('/update', function (req, res){
    var email = req.param('email', false);
    var id = req.param('id', false);
    if (!email || !id) {
      return res.redirect('/');
    }
    id = mongoose.Types.ObjectId(id);
    User.findOne({_id: id, email: email}, function (error, user){
      if (error || !user) {
        return res.status(404).render('errors', {
          status: 404,
          msg: 'Page not found.'
        });
      }
      res.render('form', {
        title: 'CarlHacks - Update',
        user: user,
        actionSent: 'Update your account',
        additional_js: ['fileUpload.js']
      });
    });
  });

  app.post('/save', function (req, res) {
    var resume = false;
    if (req.files.hasOwnProperty('resume')) {
      resume = {
        name: req.files.resume.originalname,
        path: req.files.resume.path
      };
    };
    var ret = function (user) {
      return res.render('form', {
        title: 'CarlHacks - Save Error',
        actionSent: 'Please fix the following errors:',
        user: user,
        additional_js: ['fileUpload.js']
      });
    };
    if (!req.body || !req.body.hasOwnProperty('user')) {
      return ret({errors: "No data received. Please fill out the form."});
    };
    if (resume) {
      req.body.user['resume'] = resume;
    };
    saveUser(User, req.body.user, req.headers.host, function (error, link){
      if (error) {
        var user = req.body.user;
        delete user.resume;
        user['errors'] = error;
        return ret(user);
      };
      return res.render('success', {
        title: 'CarlHacks',
        link: link
      });
    });
  })
};
