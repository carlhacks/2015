
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.register = function(req, res){
  res.render('register', { title: 'Register' });
};