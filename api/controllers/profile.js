var mongoose = require('mongoose');
var crypto = require('crypto');
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
    else{
      res.status(200).json({'answer': 'success'})
    }
  });
};

module.exports.passwordUpdate = function(req, res) {
  var new_salt = crypto.randomBytes(16).toString('hex');
  var new_hash = crypto.pbkdf2Sync(req.body.password, new_salt, 1000, 64).toString('hex');
  var update = {'hash': new_hash, 'salt': new_salt};
  delete req.body.password
  User
    .findByIdAndUpdate(req.body.id, update, {}, function(err, user){
      if (err){
        console.log(err)
      }
      else{
        res.status(200).json({'answer': 'success'})
      }
    })
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

