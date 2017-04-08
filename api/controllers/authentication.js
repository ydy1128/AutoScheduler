var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  var user = new User();

  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.classification = req.body.classification;
  user.schedules = [];
  user.preferences = {
    noti1: true,
    noti2: true
  };

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    console.log(token)
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.adminregister = function(req, res) {
  var admin = new Admin();

  admin.email = req.body.email;
  admin.setPassword(req.body.password);

  admin.save(function(err) {
    var token;
    token = admin.generateJwt();
    res.status(200);
    res.json({
      "token" : token,
      "answer": 'success'
    });
    
  });

};

module.exports.adminlogin = function(req, res) {
  passport.authenticate('local', function(err, admin, info){
    var token;
    console.log(78, admin)
    // admin.email.replace('=$&.#=admin', '');
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a admin is found
    if(admin){
      token = admin.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If admin is not found
      res.status(401).json(info);
    }
  })(req, res);

};