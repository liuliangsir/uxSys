var express = require('express');
var router = express.Router();
var resumable = require('./resumable.js')(__dirname+'/tmp/');


// Handle uploads through Resumable.js
router.post('/upload', function(req, res){

    // console.log(req);

    resumable.post(req, function(status, filename, original_filename, identifier){
        console.log('POST', status, filename,original_filename, identifier);

        res.send(status);
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
router.get('/upload', function(req, res){
    resumable.get(req, function(status, filename, original_filename, identifier){
        console.log('GET', status);
        res.send((status == 'found' ? 200 : 404), status);
    });
});

router.get('/download/:identifier', function(req, res){
    res.setHeader('Content-Disposition', contentDisposition('盗墓笔记.The.Lost.Tomb.Season.1.E08.HD720P.X264.AAC.Mandarin.CHS.mp4'));
    resumable.write(req.params.identifier, res);
});

module.exports = router;