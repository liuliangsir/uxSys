var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PDFSchema = new mongoose.Schema({
    pdfName: String,
    linkUrl: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});



var PDFModel = mongoose.model('PDF', PDFSchema);
module.exports = PDFModel;