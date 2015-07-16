var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AudioSchema = new mongoose.Schema({
    audioName: String,
    linkUrl: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});



var AudioModel = mongoose.model('Audio', AudioSchema);
module.exports = AudioModel;