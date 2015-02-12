var Mailgun = require('mailgun').Mailgun
  , key = require('./api_keys').mailgun
  , mg = new Mailgun(key);

var sendText = function (recipients, subject, message, callback) {
  mg.sendText(
    'noreply@mg.carlhacks.io',
    recipients,
    subject,
    message,
    {'X-Campaign-Id': 'carlhacks2015'},
    callback
  );
};

var sendRaw = function (recipients, subject, message, callback) {
  mg.sendText(
    'noreply@mg.carlhacks.io',
    recipients,
    subject + '\r\n\r\n' + message,
    {'X-Campaign-Id': 'carlhacks2015'},
    callback
  );
};

module.exports.sendText = sendText;
module.exports.sendRaw = sendRaw;
