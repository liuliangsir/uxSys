var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new mongoose.Schema({
    videoName: String,
    linkUrl: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});



var VideoModel = mongoose.model('Video', VideoSchema);
module.exports = VideoModel;