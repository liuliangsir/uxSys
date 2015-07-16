var express = require('express');
var router = express.Router();
var filter = require('../passport.js');
var config = require('../../config');
/* GET home page. */
router.get('/', function (req, res) {
    filter.authorize(req, res,function(){
        var url = config.domain+config.backHash;
        res.redirect(url);
    });
});

module.exports = router;