var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: {type: String, required: true},
     email: {type: String, required: true, lowercase: true, trim: true},
     phone: {type: String, required: true, trim: true},
     school: {type: String, required: true},
     classYear: {type: Number, required: true, min: 2015, max: 2019},
     urls: [String],
     resume: {
        name: {type: String, trim: true},
        path: {type: String, trim: true}
     },
     shirtSize: {type: String, required: true, uppercase: true, trim: true},
     bus: {type: String, required: true, lowercase: true, trim: true},
     dietary: [String],
     accessibility: {type: String},
     idsWoman: Boolean,
     grant: Boolean,
     noPhoto: Boolean,
     eighteen: Boolean,
     agree: {type: Boolean, required: true}
    }
);

module.exports.User = User;
