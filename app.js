var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var PythonShell 	= require('python-shell');

var app             = express();


app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Python Backend------------------------------------------------------
var pyshell = new PythonShell('backend/connect_db.py');
pyshell.on('message', function (message) {
	console.log(message);
}); 

// DB------------------------------------------------------
mongoose.connect("mongodb://localhost/frameitdb");
var db = mongoose.connection;
db.once('open', function(){
	console.log('DB Connected');
});
db.on('error', function(err){
	console.log('DB Connection Error: ', err)
});

// Routes------------------------------------------------------
var routes = require('./routes/routes')(app);

// Port-------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;