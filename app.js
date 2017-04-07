var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport 		= require('passport');

var app             = express();


app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());


// DB------------------------------------------------------
var uristring = process.env.MONGODB_URI ||
				process.env.MONGOLAB_URI ||
			    "mongodb://localhost/frameitdb";
mongoose.connect('mongodb://heroku_d4bw5531:vRT_PXeeeUkcUZkVSrT4jhVmkU6OQvyp@ds117899.mlab.com:17899/heroku_d4bw5531/db');

var db = mongoose.connection;
db.once('open', function(){
	console.log('DB Connected');
});
db.on('error', function(err){
	console.log('DB Connection Error: ', err)
});

// Routes------------------------------------------------------
// var routes = require('./routes/routes')(app);
var routes = require('./routes/routes');
var api_routes = require('./api/routes/index');

app.use('/api', api_routes);
app.use('/', routes);

// Auth------------------------------------------------------
require('./api/config/passport');
app.use(passport.initialize());


// Port-------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;