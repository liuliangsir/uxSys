var express = require('express');
var router = express.Router();
var config = require('../config');
var Project = require('../db/project');


//passport初始化
var filter = require('./passport.js');
filter.init(router, {
    passport: config.passport,
    backUrl: config.domain + config.backHash,
    backHash:config.backHash
});

router.get('/', function (req, res, next) {
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
        res.render('index', data);
    });
});

module.exports = router;