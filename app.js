var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/frameitdb');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var app = express();
// var spawn = require('child_process').spawn('python', ['backend/hello.py']);
var PythonShell = require('python-shell');
// PythonShell.run('my_script.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution 
//   console.log('results: %j', results);
// });

var pyshell = new PythonShell('backend/connect_db.py');

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement) 
  console.log(message);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.set('port', process.env.PORT || 9999);
// app.listen(app.get('port'));

module.exports = app;
