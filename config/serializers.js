
const passport = require('passport');
const User = require('../Models/User.model')

<<<<<<< HEAD:config/serializers.js

passport.serializeUser((foundUser, done) => {
    done(null, foundUser._id)
=======
passport.serializeUser((loggedInUser, done) => {
    console.log("THIS IS SERIALIZER")
    console.log(loggedInUser._id)
     done(null, loggedInUser._id)
>>>>>>> 6bf5443153e2f35a133b057b4bd5774150575f04:config/serializer.js
});


passport.deserializeUser((userIdFromSession, done) => {
    console.log("THIS IS DESERIALIZER")
    User.findById(userIdFromSession)
        .then(fullUserDoc => {
            console.log(fullUserDoc)
            done(null, fullUserDoc)})
        .catch(err => done(err));
})