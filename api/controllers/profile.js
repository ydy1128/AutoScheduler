var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.profileUpdate = function(req, res) {
  console.log('update profile')
  User.update(
    {_id: req.body._id},
    req.body
  )
  .exec(function(err, user) {
    // console.log(user)
    if (err){
      console.log(err)
    }
  });
};

module.exports.passwordUpdate = function(req, res) {
  // user.setPassword(req.body.password);
  var current_user = null;
  User
    .findById(req.body._id)
    .exec(function(err, user) {
      console.log(user)
      current_user = user;

      user.setPassword(req.body.password)
      delete req.body.password;
      User.update(
        {_id: req.body._id},
        req.body
      )
      .exec(function(err, user) {
        if (err){
          console.log(err)
        }
      });
    });

}


module.exports.adminprofileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
