var express = require('express');
var router = express.Router();
var filter = require('../passport.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    filter.logout(req, res, next);
});


module.exports = router;