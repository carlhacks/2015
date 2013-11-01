var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: String,
     email: String,
     bracket: String,
     needTeam: Boolean,
     teamName: String,
     teamMates: String});

var Project = mongoose.model('Project',
    {tname: String,
     tmems: [String],
     bracket: String,
     img: { data: Buffer, contentType: String },
     description: String,
     techs: [String]
    });

module.exports.User = User;
module.exports.Project = Project;
