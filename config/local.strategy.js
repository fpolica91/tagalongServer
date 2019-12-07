const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User.model')
const bcrypt = require('bcryptjs');

<<<<<<< HEAD
passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, next) => {
    console.log("THIS IS HAPPENING")
    User.findOne({ username })
        .then(foundUser => {
            console.log(foundUser)
            if (!foundUser) {
                return next(null, false, { message: "Incorrect username" })
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                console.log("WRONG PASSWORD")
                return next(null, false, { message: "Incorrect password" })
            }
            console.log("CORRECT PASSWORD!")
            return next(null, foundUser, { message: "Logged in successfully" })
        })
        .catch(err => next(err))
}))
=======
passport.use(new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
    console.log("THIS IS HAPPENING")
    User.findOne({ username })
    .then(foundUser => {
        console.log(foundUser)
        if (!foundUser) {
            return done(null, false, { message: "Incorrect username" })
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
            console.log("WRONG PASSWORD")
            return done(null, false, { message: "Incorrect password" })
        }
        console.log("CORRECT PASSWORD!")
        return done(null, foundUser, { message: "Logged in successfully" })
    })
    .catch(err => done(err))
}) )
>>>>>>> 6bf5443153e2f35a133b057b4bd5774150575f04
