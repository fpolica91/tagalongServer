const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.put('/user/:id', vehicleController.addVehicle)
router.post('/newUser', controller.createUser)
router.put('/tagrequest/:id', controller.tagRequest)
router.post('/newCar', controller.createCar)
// router.post('/login', controller.authenticate)


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.json({ message: "unexpected error ", err })

        } if (!user) {
            res.status(401).json(info)

        }

        req.login(user, (err) => {
            console.log("LOGIN CALLED")
            console.log('found the user', user)
            user.password = undefined
            if (err) {
                res.json({ message: "error authenticating" })
                return
            }
            res.json({ user })
        })
    })(req, res, next);
})




router.get('/loggedin', (req, res, next) => {
    console.log(req.user, "is the user")
    if (req.user) {
        req.user.password = undefined
        res.json(req.user)
    } else {
        res.json(null)
    }


})

router.delete('/logout', (req, res, next) => {
    req.logout();
    res.json({ user: null })
})









module.exports = router