const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')
const eventController = require('../controllers/event.controller')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const ticketmaster = require('../controllers/event.ticketmster')
const axios = require('axios')



router.put('/user/:id', vehicleController.addVehicle)
router.post('/newUser', controller.createUser)
router.post('/event', eventController.createEvt)
router.put('/tagrequest/:id', controller.tagRequest)
router.post('/newCar', controller.createCar)
router.get('/ticketmaster/events/:name', ticketmaster.getTicketmasterEvent)
router.get('/ticketmaster/filtered/:keyword?', ticketmaster.getQueryEvents)
router.get('/tagEvents/:keyword?', eventController.searchBarQuery)
router.get('/tagEventsBy/:user?', eventController.searchByUser)
router.put('/tagAlong/:id', eventController.request)
router.put('/acceptTag/:id', eventController.acceptRequest)




router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.json({ message: "unexpected error ", err })
        } if (!user) {
            res.status(401).json(info)
        }
        req.login(user, (err) => {
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
    console.log(req.user, "_____is the user")
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