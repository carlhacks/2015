var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: String,
     email: {type: String, lowercase: true, trim: true},
     school: String,
     classYear: {type: Number, min: 2015, max: 2019},
     shirtSize: {type: String, uppercase: true, trim: true},
     dietary: [String],
     idsWoman: Boolean,
     grant: Boolean,
     agreeMail: Boolean,
     agreeCode: Boolean
    }
);

module.exports.User = User;
