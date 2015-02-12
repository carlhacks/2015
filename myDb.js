var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: String,
     email: {type: String, lowercase: true, trim: true},
     school: String,
     classYear: {type: Number, min: 2015, max: 2019},
     urls: String,
     shirtSize: {type: String, uppercase: true, trim: true},
     dietary: [String],
     idsWoman: Boolean,
     grant: Boolean,
     agreeMail: Boolean,
     noPhoto: Boolean,
     agreeCode: Boolean
    }
);

module.exports.User = User;
