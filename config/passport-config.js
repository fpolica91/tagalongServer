const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../Models/User.model')


module.exports = (passport) => {

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
    }) 

    )
    passport.serializeUser((user, done) => { 
    console.log("SUCCESSFULLY LOGGED IN!")
   return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log("DESERIALIZE!")
    User.findById(id, (err, user) => {
       return done(err, user)
    })
 } )
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