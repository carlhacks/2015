var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: {type: String, required: true},
     email: {type: String, required: true, lowercase: true, trim: true},
     school: {type: String, required: true},
     classYear: {type: Number, required: true, min: 2015, max: 2019},
     urls: [String],
     resume: {
        name: {type: String, required: true, trim: true},
        path: {type: String, required: true, trim: true}
     },
     shirtSize: {type: String, required: true, uppercase: true, trim: true},
     bus: {type: String, required: true, lowercase: true, trim: true},
     dietary: [String],
     idsWoman: Boolean,
     grant: Boolean,
     noPhoto: Boolean,
     agree: {type: Boolean, required: true}
    }
);

module.exports.User = User;
