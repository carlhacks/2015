
/*
 * Not used currently.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.register = function(req, res) {
  res.render('register', { title: 'Register' });
};

exports.submit = function(req, res) {
  res.render('submit', { title: 'Submit' });
}

exports.projects = function(req, res) {
  res.render('projects', { title: 'Projects' });
}
