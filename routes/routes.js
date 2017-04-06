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
});

router.get('/class-data', function(req, res){
    /*
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
	console.log(classes.schedule);
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
    */
    var query = Classes.find({});
    
    query.exec(function(err, cls){
		if(err)
		    res.send(err);
		else
		    res.json(cls);
    })
});
router.delete('/delete-all-class-data', function(req, res){
    var query = Classes.remove({});
    query.exec(function(err, cls){
	// console.log(cls);
	if(err)
	    res.send(err);
	else
	    res.json(cls);
    })
})
//CSCE^112^person1&&person2^M&&W
//CSCE
router.get('/search-course:conditions', function(req, res){
    // console.log(req.params.conditions);
    var cond = req.params.conditions.split("^");
    var subjects = cond[0].split("&&");
    var courses = cond[1].split("&&");
    var instructors = cond[2].split("&&");
    var days = cond[3].split("&&");
    // console.log(subjects);
    // console.log(courses);
    // console.log(instructors);
    // console.log(days);
    
    var query = Classes.find({});//.where('subject').in(subjects);
    if (subjects[0] != '') query = query.where('subject').in(subjects);
    if (courses[0] != '') query = query.where('course').in(courses);
    if (instructors[0] != '') query = query.where('instructor').in(instructors);
    if (days[0] != '') query = query.where({'schedule': {'$elemMatch': {'days': {'$in':days}}}});
    query.exec(function(err, cls){
	// console.log(cls);
 	if(err)
 	    res.send(err);
 	else
 	    res.json(cls);
    })
});

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
router.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/../public' });
});

module.exports = router;
