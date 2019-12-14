
const passport = require('passport');
const User = require('../Models/User.model')

passport.serializeUser((user, done) => {
    done(null, user)
});


passport.deserializeUser((id, done) => {
    console.log('deserializer')
    User.findById(id)
    .then(user=>{
        done(null, user)
    })
})