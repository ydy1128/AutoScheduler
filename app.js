var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var mongoose = require('mongoose');
var class_data = require('./public/js/dummie_data.js')
// var db = monk('localhost:27017/frameitdb');
var index = require('./routes/index');
// var documents = require('./routes/documents');

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
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');

mongoose.connect("mongodb://localhost/frameitdb");
var db = mongoose.connection;

db.once('open', function(){
  console.log('DB Connected');
})

db.on('error', function(err){
  console.log('DB Connection Error: ', err)
})

// var ClassSchema = new mongoose.Schema({
//   subject : String,
//   course : String,
//   crn : String,
//   section : String,
//   credit : Number,
//   title : String,
//   schedule : [{
//     days : String,
//     start_time : String, 
//     end_time : String, 
//     location : String
//   }],
//   instructor : [String],
//   date : { 
//     start_date : String, 
//     end_date : String
//   },
//   attribute : String,
//   discription : String  
// })
// var Classes = mongoose.model('Classes', ClassSchema);
// for (var i = 0; i < class_data.classes.ClassInfo.length; i++){
//   var clss = new Classes(class_data.classes.ClassInfo[i]);
//   clss.save(function(err){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log(clss)
//     }
//   })
// }

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
// app.use('/documents', documents);

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

process.on('SIGTERM', function(){
  db.close()
})

module.exports = app;
