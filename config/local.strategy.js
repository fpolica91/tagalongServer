const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Models/User.model')
const bcrypt = require('bcryptjs')

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