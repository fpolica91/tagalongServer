const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')
const passport = require('passport')

router.post('/new', controller.createUser)
router.put('/user/:id', vehicleController.addVehicle)

router.post('/newUser', controller.createUser)

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, userDoc, failureDetails) => {
        if (err) {
            res.status(500).json({ message: "Something went wrong with login" })
        }
        if (!userDoc) {
            res.status(401).json(failureDetails)
        }

        req.login(userDoc, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong with getting user object from DB' })
                return;
            }

            userDoc.encryptedPassword = undefined;
            res.status(200).json({ userDoc })
        })
    })(req, res, next);
})
// router.post('/authUser', controller.authUser)





module.exports = router