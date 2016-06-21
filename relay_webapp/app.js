// Dependencies

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //HTTP request logger
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// https://nodejs.org/api/child_process.html
var execFile = require('child_process').execFile //run shell commands. Assync proc

var routes = require('./routes/index');

var app = express();
// server configs
// const hostname = '0.0.0.0';
// const port = 3000;

//------------------------------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//Routes
app.use('/', routes);

/**
 * @api {get} /on Turn on Relay
 */
app.get('/on',function(req,res){
    console.log("Relay on");
    //Child process/callback
    var child = execFile("./main", ["on"], function (error, stdout, stderr) {
    console.log("Here is the complete output of the program: ");
    console.log(stdout)
    });
    res.redirect('/');  
})   

//------------------------------------------------------------------------------
/**
 * @api {get} /off Turn off Relay
 */
app.get('/off',function(req,res){
    console.log("Relay off");
    var child = execFile("./main", ["off"], function (error, stdout, stderr) {
    console.log("Here is the complete output of the program: ");
    console.log(stdout)
    });
    res.redirect('/');  
})   

//------------------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//------------------------------------------------------------------------------
// var server = app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


