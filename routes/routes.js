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