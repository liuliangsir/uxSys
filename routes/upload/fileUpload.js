var express = require('express');
var path = require('path');
var router = express.Router();
var filter = require('../passport.js');
var Appendix = require('../../db/appendix');
var resumable = require('./resumable.js')(path.join(__dirname,'../../public/tmp/'));


// Handle uploads through Resumable.js
router.post('/upload', function (req, res) {
    filter.authorize(req, res, function (req, res) {


        resumable.post(req, function (status, filename, original_filename, identifier) {
            //console.log('POST', status, filename, original_filename, identifier);
            if (status == 'done') {
                var type = req.body.type;
                var name = req.body.realName || filename;
                var appendix = new Appendix();
                appendix.type = type;
                appendix.name = name;
                appendix.linkUrl = identifier;
                appendix.save(function (err, appendixEntity) {
                    if (err) {
                        res.send(status, {
                            success: false, // 标记失败
                            model: {
                                error: '系统错误'
                            }
                        });
                    } else {
                        res.send(status, {
                            success: true,
                            model: appendixEntity
                        });
                    }
                });
            } else {
                res.send(status);
            }
        });
    });
});

// Handle cross-domain requests
// NOTE: Uncomment this funciton to enable cross-domain request.
/*
 app.options('/upload', function(req, res){
 console.log('OPTIONS');
 res.send(true, {
 'Access-Control-Allow-Origin': '*'
 }, 200);
 });
 */

// Handle status checks on chunks through Resumable.js
router.get('/upload', function (req, res) {
    resumable.get(req, function (status, filename, original_filename, identifier) {
        console.log('GET', status);
        res.send((status == 'found' ? 200 : 404), status);
    });
});

router.get('/download/:identifier', function (req, res) {
    res.setHeader('Content-Disposition', contentDisposition('盗墓笔记.The.Lost.Tomb.Season.1.E08.HD720P.X264.AAC.Mandarin.CHS.mp4'));
    resumable.write(req.params.identifier, res);
});

module.exports = router;