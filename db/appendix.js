var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppendixSchema = new mongoose.Schema({
    type:String,
    name: String,
    linkUrl: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});



var AppendixModel = mongoose.model('Appendix', AppendixSchema);
module.exports = AppendixModel;