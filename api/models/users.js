var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  classification: {
    type:String,
    required: true
  },
  schedules: [
    {
      name: String,
      courses: [{
        subject: String,
        course: String,
        section: String,
        tba: Boolean
      }]
    }
  ],
  preferences: {
    noti1: {
      type: Boolean
    },
    noti2: {
      type: Boolean
    }
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  var secret = process.env.SECRET || "MY_SECRET";
  expiry.setDate(expiry.getDate() + 120);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    exp: parseInt(expiry.getTime() / 1000),
  }, secret);
};

mongoose.model('User', userSchema);
