var request = require('request');
var passport = {};


passport.authorize = function (req, res, next) {
    if (req.session.passportToken) {
        next(req, res);
    } else {
        res.redirect(passport.opt.passport + '/login?backUrl=' + passport.opt.backUrl + '/passportAuth');
    }
};


passport.init = function (router, opt) {
    passport.opt = opt;
    router.get(passport.opt.backHash + '/passportAuth', function (req, res) {
        var code = req.query.code;
        request(passport.opt.passport + '/token', {
            method: 'POST',
            form: {code: code},
            headers: req.headers
        }, function (re, rs, obj) {
            obj = JSON.parse(obj);
            req.session.passportToken = obj.model.token;
            passport.login(req, res, function () {
                res.redirect(passport.opt.backUrl);
            });

        });
    });
};

passport.login = function (req, res, cb) {
    var passportToken = req.session.passportToken;
    request(passport.opt.passport + '/user', {
        method: 'GET',
        form: {token: passportToken}
    }, function (re, rs, obj) {
        obj = JSON.parse(obj);
        if (obj.success) {
            req.session.user = obj.model.user;
            cb(obj);
        } else {
            req.session.passportToken = null;
            res.redirect(passport.opt.passport + '/login?backUrl=' + passport.opt.backUrl + '/passportAuth');
        }

    });
};

passport.logout = function (req, res, cb) {
    req.session.destroy(function (err) {
        if (err) {
            res.status(500).send({
                success: false,
                model: {
                    error: '注销失败'
                }
            });
        } else {
            res.status(200).send({
                success: true
            });
        }
    });
};


module.exports = passport;