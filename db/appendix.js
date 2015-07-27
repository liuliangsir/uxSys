var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppendixSchema = new mongoose.Schema({
    type: String,
    name: String,
    linkUrl: String,
    state: {type: Number, default: 1},
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
AppendixSchema.static('getAppendix', function (AppendixId, cb) {
    return this.findById(AppendixId, cb);
});


AppendixSchema.static('updateAppendix', function (AppendixId, cb) {
    var that =this;
    that.findById(AppendixId, function (err,appendixEntity) {
        if (err) {
            return cb;
        } else {
            appendixEntity.state = 2;
            return that.findOneAndUpdate({
                _id: appendixEntity._id
            }, appendixEntity, {'new': true}).exec(cb);

        }
    });

});

var AppendixModel = mongoose.model('Appendix', AppendixSchema);
module.exports = AppendixModel;