const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../Models/User.model')


module.exports = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        User.findOne({ username })
            .then(foundUser => {
                console.log(foundUser)
                if (!foundUser) {
                    return done(null, false, { message: "Incorrect username" })
                }
                if (!bcrypt.compareSync(password, foundUser.password)) {
                    return done(null, false, { message: "Incorrect password" })
                }
                return done(null, foundUser)
            })
            .catch(err => done(err))
    })

    )
    //  DO WE NEED THIS AGAIN
    // passport.serializeUser((user, done) => {
    //     console.log("SUCCESSFULLY LOGGED IN!")
    //     return done(null, user.id)
    // })

    // passport.deserializeUser((id, done) => {
    //     console.log("DESERIALIZE!")
    //     User.findById(id, (err, user) => {
    //         return done(err, user)
    //     })
    // })
}

// passport.serializeUser((user, done) => { 
//     console.log("SUCCESSFULLY LOGGED IN!")
//    return done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//     console.log("DESERIALIZE!")
//     User.findById(id, (err, user) => {
//        return done(err, user)
//     })
//  } )