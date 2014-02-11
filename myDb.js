var mongoose = require('mongoose');

var User = mongoose.model('User',
    {name: String,
     email: String,
     bracket: String,
     needTeam: Boolean,
     teamName: String,
     teamMates: String,
     hackathon: String
    });

var Project = mongoose.model('Project',
    {tname: String,
     tmems: String,
     bracket: String,
     img: String,
     description: String,
     techs: String,
     hackathon: String
    });

var ProjImage = mongoose.model('ProjImage', { data: Buffer, contentType: String });

module.exports.User = User;
module.exports.Project = Project;
module.exports.ProjImage = ProjImage;
