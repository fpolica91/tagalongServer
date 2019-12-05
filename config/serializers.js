
const passport = require('passport');
const User = require('../Models/User.model')


passport.serializeUser((foundUser, done) => {
    done(null, foundUser._id)
});


passport.deserializeUser((userIdFromSession, done) => {
    User.findById(userIdFromSession)
        .then(fullUserDoc => done(null, fullUserDoc))
        .catch(err => done(err));
})