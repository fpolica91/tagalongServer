const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User.model')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    username: 'username'
}, (username, password, done) => {


    User.findOne({ username })
        .then(foundUser => {
            if (!foundUser) {
                done(null, false, { message: "Incorrect username" })
            } else if (!bcrypt.compareSync(password, foundUser.password)) {
                done(null, false, { message: "Incorrect password" })
            } else {
                return done(null, foundUser)
            }


        })
        .catch(err => done(err))
}))