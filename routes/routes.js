const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const ticketmaster = require('../controllers/event.ticketmster')
const axios = require('axios')

router.put('/user/:id', vehicleController.addVehicle)
router.post('/newUser', controller.createUser)
router.put('/tagrequest/:id', controller.tagRequest)
router.post('/newCar', controller.createCar)
// router.get('/ticketmaster/events/name', ticketmaster.getTicketmasterEvent)
// router.post('/login', controller.authenticate)
router.get('/ticketmaster/events/:name', (req, res, next) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=[${req.params.name}]`, {
        params: {
            "apikey": "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh"
        }
    })
        .then(response => {
            const { events } = response.data._embedded
            console.log(events[0])
            let newMap = events.map(eachElement => {
                return {
                    name: eachElement.name, 
                    url: eachElement.url,
                    date: eachElement.dates.start.localDate,
                    status: eachElement.dates.status,
                    promoter: eachElement.promoter ? eachElement.promoter.name : undefined,
                    description: eachElement.promoter ? eachElement.promoter.description : undefined,
                }
            })
            res.json(newMap)
        }).catch(err => console.error(err))
})




router.post('/login', (req, res, next) => {
    console.log(req.body, "user trying to log in")
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