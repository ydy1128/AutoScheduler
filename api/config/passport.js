var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function(username, password, done) {
    console.log(username)
    if(username.split('=$&.#=')[1] == 'admin'){
      console.log('admin-in')
      username = username.split('=$&.#=')[0]
      console.log(username)
      Admin.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'Admin not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
    else{
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  }
));