var mailer = require('./mailer');

mailer.sendText(
  'robert@lord.io',
  'Test Mail from Matt',
  'This is the Carlhacks that you"ve been waiting for. ' +
  'http://google.com',
  function (error) {
    if (error) {
      console.log('Error', error);
    } else {
      console.log('Success!');
    };
  }
);