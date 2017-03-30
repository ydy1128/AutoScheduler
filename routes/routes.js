var express 	= require('express');
var router 		= express.Router();
var mongoose	= require('mongoose');
var Classes		= require('../models/classes');

router.get('/class-data', function(req, res){
	var query = Classes.find({});
	query.exec(function(err, cls){
		if(err)
			res.send(err);
		else
			res.json(cls);
	})
})

router.get('/update-schedule:key', function(req, res){
	var keys = req.params.key.split('-');
	var subject = keys[0];
	var course = keys[1];
	var section = keys[2];
	var query = Classes.find({subject: subject, course: course, section: section});
	query.exec(function(err, cls){
		if(err)
			res.send(err);
		else
			res.json(cls);
	})
})
// app.get('/clas-data/:subject', function(req, res){
// 	var query = Classes.find({subject: req.params.subject});
// 	query.exec(function(err, cls){
// 		if(err)
// 			res.send(err);
// 		else
// 			res.json(cls);
// 	})
// })
router.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/../public' });
});

module.exports = router;