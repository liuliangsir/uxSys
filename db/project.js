var mongoose = require('mongoose');
var Appendix = require('./appendix');

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
    return this.findById(projectId, function (err, projectEntity) {
        if (projectEntity) {
            projectEntity = mixObject(projectEntity);
            Appendix.getListByProject(projectId, function (err, appendixList) {
                if (appendixList) {
                    projectEntity.appendixList = appendixList;
                }
                if (cb) {
                    cb(err, projectEntity);
                }
            });
        }


    })
});

ProjectSchema.static('updateProject', function (newProject, cb) {
    newProject.upDateTime = new Date();
    return this.findOneAndUpdate({
        _id: newProject.uid
    }, newProject, {'new': true}).exec(cb);
});


function mixObject(obj) {
    var tmpObj = {};
    for (var key in obj) {
        if (type(obj[key]) == 'date' || type(obj[key]) == 'string' || type(obj[key]) == 'number' || type(obj[key]) == 'array') {
            tmpObj[key] = obj[key];
        }
    }
    return tmpObj;
}

function type(o) {
    var TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error'
    };

    var TOSTRING = Object.prototype.toString;
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
}

var ProjectModel = mongoose.model('Project', ProjectSchema);
module.exports = ProjectModel;