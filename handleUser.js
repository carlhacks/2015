var mongoose = require('mongoose')
  , validator = require('validator')
  , mailer = require('./mailer');

var USER_KEYS = {
  name: 1,
  email: 1,
  school: 1,
  classYear: 1,
  urls: 1,
  shirtSize: 1,
  dietary: 1,
  idsWoman: 1,
  grant: 1,
  agreeMail: 1,
  noPhoto: 1,
  agreeCode: 1
};

var saveUser = function (model, data, callback) {
  // map check boxes onto booleans
  for (key in {idsWoman: 1, grant: 1, agreeMail: 1, noPhoto: 1, agreeCode: 1}) {
    data[key] = data.hasOwnProperty(key)
  };

  // turn dietary check boxes into list.
  var dietary = []
  for (key in data.dietary) {
    dietary.push(key);
  };

  // validate email
  if (data.hasOwnProperty('email') && !validator.isEmail(data.email)) {
    return callback(true);
  };

  data.dietary = dietary;
  var handle_user = function (error, user, isNew) {
    for (key in USER_KEYS) {
      if (data.hasOwnProperty(key)) {
        user[key] = data[key];
      }
    }
    user.save(function (error, saved_user) {
      if (error) return callback(error);
      var name = saved_user.name
        , email = saved_user.email
        , _id = saved_user._id;
      link = 'http://carlhacks.io/update?email=' + email + '&id=' + _id
      email = name + '<' + email + '>';
      var verbs = isNew ? ['creating an', 'update your account'] :
                          ['make more changes', 'updating your'];
      return mailer.sendText(
        email,
        'Your CarlHacks Account',
        'Thanks for ' + verbs[0] + ' account! We will be keeping you up to ' +
        'date as we get closer to the event. In the mean time feel free to ' +
        verbs[1] + ' here:\n\n' + link + '\n\nFor questions or ' +
        'assistance, contact info@carlhacks.io and we\'ll get back to you ' +
        'as fast as possible.\n\nThanks!\n-The CarlHacks Team',
        callback
      );
    });
  };

  if (data.hasOwnProperty('id')) {
    model.findOne({_id: mongoose.Types.ObjectId(data.id)}, handle_user);
  } else {
    handle_user(false, new model(), true);
  };
}

module.exports.saveUser = saveUser;