
const passport = require('passport');
const User = require('../Models/User.model')

passport.serializeUser((user, done) => {
    // done(null, { _id: user._id })
    done(null, user)
});


passport.deserializeUser((id, done) => {
    console.log("THIS IS DESERIALIZER")
    User.findById(id).populate('events')
        .then(user => {
            done(null, user)
        })
        .catch(error => res.json(error))
    // User.findOne({ _id: id }, (err, user) => {
    //     done(err, user)
    // })
})

// PASSPORT IS NOT PROMISED BASED!
