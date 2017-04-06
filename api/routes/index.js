var express 		= require('express');
var router 			= express.Router();
var jwt 			= require('express-jwt');

var Users		= require('../models/users');
var Admin		= require('../models/admin');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/user:id', ctrlProfile.profileUpdate);
router.put('/password-change:id', ctrlProfile.passwordUpdate);
router.get('/adminprofile', auth, ctrlProfile.adminprofileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// admin authentication
router.post('/adminregister', ctrlAuth.adminregister);
router.post('/adminlogin', ctrlAuth.adminlogin);


module.exports = router;
