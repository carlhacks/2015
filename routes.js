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

  app.get('/count', function(req, res){
    User.count({}, function( err, count){
      res.send({ count: count });
    })
  });

  app.get('/update', function (req, res){
    var email = req.param('email', false);
    var id = req.param('id', false);
    if (!email || !id) {
      return res.status(404).render('errors.jade', {
        status: 404,
        msg: 'Page not found.'
      });
    }
    id = mongoose.Types.ObjectId(id);
    User.findOne({_id: id, email: email}, function (error, user){
      if (error || !user) {
        return res.redirect('/');
      }
      res.render('userUpdate.jade', {
        title: 'Update Your Info',
        user: user,
      });
    });
  });

  app.post('/users/save', function (req, res) {
    if (!req.body || !req.body.hasOwnProperty('user')) {
      return res.status(400).render('errors.jade', {
        status: 400,
        msg: 'Bad input.'
      });
    };
    saveUser(User, req.body.user, function (error){
      if (error) {
        return res.status(400).send({status: 'error'});
      };
      return res.send({status: 'ok'});
    });
  })
};
