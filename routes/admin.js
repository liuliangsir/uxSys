var express = require('express');
var router = express.Router();
var filter = require('./passport.js');
var Project = require('../db/project');

router.get('/', function (req, res) {
    filter.authorize(req, res, function () {
        Project.getList(function (err, projectList) {
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
                    model: projectList
                };
            }
            res.render('admin/list', data);
        });

    });
});

router.get('/edit', function (req, res) {
    filter.authorize(req, res, function () {
        var projectId = req.query.projectId;
        Project.getProject(projectId, function (err, projectEntity) {
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

            res.render('admin/edit', data);
        });
    });
});

router.get('/add', function (req, res) {
    filter.authorize(req, res, function () {
        res.render('admin/add');
    });
});


module.exports = router;