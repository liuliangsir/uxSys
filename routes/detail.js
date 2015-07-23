var express = require('express');
var router = express.Router();
var Project = require('../db/project');


router.get('/', function (req, res, next) {
    var projectId = req.query.projectId;
    Project.getProject(projectId,function (err, projectEntity) {
        var data = {};
        if (err) {
            data = {
                success: false,
                model: {
                    error: '系统错误'
                }
            };
        } else {
            data = {
                success: true,
                model: projectEntity
            };
        }

        console.log(data);
        res.render('detail', data);
    });
});

module.exports = router;