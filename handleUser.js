var mongoose = require('mongoose')
  , fs = require('fs')
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
  noPhoto: 1,
  agree: 1,
  resume: 1
};

var saveUser = function (model, data, host, callback) {
  // map check boxes onto booleans
  for (key in {idsWoman: 1, grant: 1, noPhoto: 1, agree: 1}) {
    data[key] = data.hasOwnProperty(key)
  };

  // turn dietary check boxes into list.
  var dietary = []
  for (key in data.dietary) {
    dietary.push(key);
  };

  var errors = '';

  if (!data.agree) {
    errors += 'You must agree to the CarlHacks terms and code of conduct.<br>';
  };

  // validate email
  if (data.hasOwnProperty('email') && !validator.isEmail(data.email)) {
    console.log('Bad email')
    errors += '"' + data.email + '" is not a valid email.<br>';
  };

  // get and validate urls
  if (data.hasOwnProperty('urls')) {
    var urls = data.urls.trim().split('\n');
    for (var i = 0; i < urls.length; i++) {
      // remove common errors, remove http/https
      urls[i] = urls[i].trim();
      urls[i] = urls[i].replace(/ *[,;]$/, '')
                       .replace(/^https?:\/\//, '');
      if (!validator.isURL(urls[i])) {
        console.log('Bad URL: ', urls[i]);
        errors += 'Poorly formatted URL: "' + data.email + '".<br>';
      }
    }
    data.urls = urls;
  }

  data.dietary = dietary;
  var handle_user = function (error, user, isNew) {
    var old_resume = false;
    var old_email = user.email;
    if (data.hasOwnProperty('resume') && ('resume' in user) && (typeof(user.resume) ==='string')) {
      old_resume = JSON.parse(JSON.stringify(user.resume));
    };
    for (key in USER_KEYS) {
      if (data.hasOwnProperty(key)) {
        user[key] = data[key];
      };
    };
    user.save(function (error, saved_user) {
      if (error) return callback(error);
      if (old_resume) {
        if (saved_user.resume.path != old_resume.path) {
          fs.unlink(old_resume.path, function (err) {
            if (err) {
              console.log('failed to delete ' + old_resume.path);
            } else {
              console.log('deleted file ' + old_resume.path);
            };
          });
        };
      };
      var name = saved_user.name
        , email = saved_user.email
        , _id = saved_user._id
        , link = 'http://' + host + '/update?email=' + email + '&id=' + _id;

      email = name + '<' + email + '>';
      var verbs = isNew ? ['applying', 'update your application'] :
                          ['updating your application', 'make more changes'];
      if (old_email === saved_user.email) return callback(false, link);
      return mailer.sendText(
        email,
        'Your CarlHacks Application',
        'Thanks for ' + verbs[0] + '! We will update your acceptance status ' +
        'as we get closer to the event. In the mean time feel free to ' +
        verbs[1] + ' here:\n\n' + link + '\n\nFor questions or ' +
        'assistance, contact info@carlhacks.io and we\'ll get back to you ' +
        'as fast as possible.\n\nThanks!\n-The CarlHacks Team',
        function (error) { callback(error, link); }
      );
    });
  };

  if (errors) {
    return callback(errors);
  };

  if (data.hasOwnProperty('id')) {
    model.findOne({_id: mongoose.Types.ObjectId(data.id)}, handle_user);
  } else {
    handle_user(false, new model(), true);
  };
}

module.exports.saveUser = saveUser;
