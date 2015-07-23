var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppendixSchema = new mongoose.Schema({
    type: String,
    name: String,
    linkUrl: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});


AppendixSchema.static('linkProject', function (fileId, projectEntity) {
    return this.findOneAndUpdate({
        _id: fileId
    }, {project: projectEntity}, {'new': true}).exec(function () {
    });
});

AppendixSchema.static('getListByProject', function (projectId, cb) {
    return this.find({project: projectId}).exec(cb);
});


var AppendixModel = mongoose.model('Appendix', AppendixSchema);
module.exports = AppendixModel;