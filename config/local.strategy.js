const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../Models/User.model')
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
    username: 'username'
}, (username, password, next) => {
    User.findOne({ username })
        .then(foundUser => {
            if (!foundUser) {
                return next(null, false, { message: "Incorrect username" })
            }
            if (!bcrypt.compareSync(password, foundUser.encryptedPassword)) {
                return next(null, false, { message: "Incorrect password" })
            }
            return next(null, foundUser, { message: "Logged in successfully" })
        })
        .catch(err => next(err))
}))