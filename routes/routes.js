var express 	= require('express');
var router 	= express.Router();
var mongoose	= require('mongoose');
var Classes     = require('../models/classes');
var fs          = require('fs');
var path        = require('path');

router.post('/create-classdb', function(req, res){
     var local = fs.readFileSync(
	path.join(__dirname, '../backend/classes.json'), 'utf8');
	   
    var courses = JSON.parse(local, (key, value) => {
	return value;
    });

    for (var i = 0; i < courses.length; i++) {

	var classes = new Classes();
	classes.subject = courses[i].subject;
	classes.course = courses[i].course;
	classes.crn = courses[i].crn;
	classes.section = courses[i].section;
	classes.credit = courses[i].credit;
	classes.title = courses[i].title;
	classes.schedule = courses[i].schedule;
	classes.instructor = courses[i].instructor;
	if (courses[i].date == "TBA"){
	    classes.date.start_date = "TBA";
	    classes.date.end_date = "TBA";
	}
	else
	    classes.date = courses[i].date;
	
	classes.save(function(err) {
	    if (err)
		console.log(err);
	});
    }
})

router.get('/class-data', function(req, res){

    var query = Classes.find({});
    
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
