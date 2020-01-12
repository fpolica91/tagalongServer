
const passport = require('passport');
const User = require('../Models/User.model')

passport.serializeUser((user, done) => {
    console.log(user, "THE USER")
    // done(null, { _id: user._id })
    done(null, user)
});


passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user, error) => {
            if (error) {
                res.json({ success: false, message: "unexpected error" })
            } else {
                done(null, user)
            }
        })

    // User.findById(id)
    //     .then(user => {

    //         done(null, user)
    //     })
    //     .catch(error => res.json(error))

})

// PASSPORT IS NOT PROMISED BASED!
