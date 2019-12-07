const passport = require('passport')
const User = require('../Models/User.model')

passport.serializeUser((loggedInUser, done) => {
    console.log("THIS IS SERIALIZER")
    console.log(loggedInUser._id)
     done(null, loggedInUser._id)
});

passport.deserializeUser((userIdFromSession, done) => {
    console.log("THIS IS DESERIALIZER")
    User.findById(userIdFromSession)
        .then(fullUserDoc => {
            console.log(fullUserDoc)
            done(null, fullUserDoc)})
        .catch(err => done(err));
})