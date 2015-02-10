var USER_KEYS = {
  name: 1,
  email: 1,
  school: 1,
  classYear: 1,
  shirtSize: 1,
  dietary: 1,
  idsWoman: 1,
  grant: 1,
  agreeMail: 1,
  agreeCode: 1
};

var mongoose = require('mongoose');

var saveUser = function (model, data, callback) {
  for (key in {idsWoman: 1, grant: 1, agreeMail: 1, agreeCode: 1}) {
    data[key] = data.hasOwnProperty(key)
  };
  var dietary = []
  for (key in data.dietary) {
    dietary.push(key);
  };
  data.dietary = dietary;
  var handle_user = function (error, user) {
    for (key in USER_KEYS) {
      if (data.hasOwnProperty(key)) {
        user[key] = data[key];
      }
    }
    user.save(function (error) {
      callback(error);
    });
  };
  if (data.hasOwnProperty('id')) {
    model.findOne({_id: mongoose.Types.ObjectId(data.id)}, handle_user);
  } else {
    handle_user(false, new model());
  };
}


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
      console.log(user);
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
        return res.send({status: 'error'});
      };
      return res.send({status: 'ok'});
    });
  })
};