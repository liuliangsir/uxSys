var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var app = express();
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./config');

if (config.NODE_ENV == 'dev') {
    mongoose.connect('mongodb://ux:ux@192.168.112.94:27017/ux');
} else {
    mongoose.connect('mongodb://127.0.0.1:27017/ux');
}
var MongoStore = require('connect-mongo')(session);

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'wxmssession',
    key: 'wxmssession',//cookie name
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));


app.use(multipart());

var index = require('./routes/index');

var admin = require('./routes/admin');

var detail = require('./routes/detail');

var file = require('./routes/upload/fileUpload');

var addProject = require('./routes/project/addProject');
var delProject = require('./routes/project/delProject');
var updateProject = require('./routes/project/updateProject');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/wxms.ico'));
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/index', index);
app.use('/admin', admin);
app.use('/detail', detail);

app.use('/addProject', addProject);
app.use('/delProject', delProject);
app.use('/updateProject', updateProject);

app.use('/file', file);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.locals.dateFormat = function(dateStr) {
    return new Date(dateStr).format("yyyy-MM-dd");
};


Date.prototype.format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};


module.exports = app;
