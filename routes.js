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
    res.sendfile('img/favicon.png', {root: './public'});
  });

  app.get('/count', function(req, res){
    User.count({}, function( err, count){
      res.send({ count: count });
    })
  });

  app.get('/register', function(req, res){
    User.count({}, function( err, count){
      res.render('form', {
        title: 'CarlHacks - Register',
        count: count,
        user: {},
        actionSent: 'Register for CarlHacks',
        additional_js: ['userForm.js']
      });
    })
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
        additional_js: ['userForm.js']
      });
    });
  });

  app.post('/users/save', function (req, res) {
    if (!req.body || !req.body.hasOwnProperty('user')) {
      return res.status(400).render('errors', {
        status: 400,
        msg: 'Bad input.'
      });
    };
    saveUser(User, req.body.user, req.headers.host, function (error, link){
      if (error) {
        return res.status(400).send({status: 'error'});
      };
      return res.send({status: 'ok', link: link});
    });
  })
};
