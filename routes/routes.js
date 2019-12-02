const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')

router.post('/newUser', controller.createUser)
// router.post('/authUser', controller.authUser)


// router.post('/event', controller.newEvent)


module.exports = router