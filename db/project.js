var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    projectName: String,
    description: String,
    upDateTime: Date,
    releaseTime: Date
});


ProjectSchema.static('getList', function (cb) {
    return this.find().sort({upDateTime: -1}).exec(cb);
});

ProjectSchema.static('delProject', function (projectId, cb) {
    return this.findByIdAndRemove(projectId).exec(cb);
});

ProjectSchema.static('getProject', function (projectId, cb) {
    return this.findById(projectId, cb)
});

ProjectSchema.static('updateProject', function (newProject, cb) {
    newProject.upDateTime = new Date();
    return this.findOneAndUpdate({
        _id: newProject.uid
    }, newProject, {'new': true}).exec(cb);
});

var ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;