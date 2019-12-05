// const express = require('express');
// const router = express.Router()

// const User = require('../Models/User.model')



// router
//     .post('/auth/login', (req, res, next) => {
//         passport.authenticate('local', (err, userDoc, failureDetails) => {
//             if (err) {
//                 res.status(500).json({ message: "Something went wrong with login" })
//             }
//             if (!userDoc) {
//                 res.status(401).json(failureDetails)
//             }

//             req.login(userDoc, (err) => {
//                 if (err) {
//                     res.status(500).json({ message: 'Something went wrong with getting user object from DB' })
//                     return;
//                 }
//                 res.status(200).json({ userDoc })
//             })
//         })(req, res, next)
//     })



// module.exports = router