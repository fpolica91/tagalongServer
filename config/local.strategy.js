const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User.model')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username })
        .then(foundUser => {
            if (!foundUser) {
                return done(null, false, { message: "Incorrect username" })
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                return done(null, false, { message: "Incorrect password" })
            }
            return done(null, foundUser, { message: "Logged in successfully" })
        })
        .catch(err => new Error(err))
}))
