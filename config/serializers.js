
const passport = require('passport');
const User = require('../Models/User.model')

passport.serializeUser((user, done) => {
    // done(null, { _id: user._id })
    done(null, user)
});


passport.deserializeUser((id, done) => {
    console.log("THIS IS DESERIALIZER")
    User.findById(id)
        .then(user => {
            done(null, user)
        })
    // User.findOne({ _id: id }, (err, user) => {
    //     done(err, user)
    // })
})

// PASSPORT IS NOT PROMISED BASED!