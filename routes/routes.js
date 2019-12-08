const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.post('/new', controller.createUser)
router.put('/user/:id', vehicleController.addVehicle)
router.post('/newUser', controller.createUser)
// router.post('/login', controller.authenticate)


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log("USER FOUND")
        console.log(user)
        if (err) {
            res.status(500).json({ message: "unexpected error ", err })
        } if (!user) {
            res.status(401).json(info)
        }

        console.log("login")
        req.login(user, (err) => {
            console.log("LOGIN CALLED")
            if (err) {
                res.status(500).jason({ message: "error authenticating" })
                return
            } else {
                res.status(200).json({ user })
            }

        })
    })(req, res, next);
})

router.get('/loggedin', (req, res, next) => {
    console.log("USER LOGGED IN")
    console.log(req.user)
})

router.delete('/logout', (req, res, next) => {
    req.logout();
    res.json({user: null})
})









module.exports = router