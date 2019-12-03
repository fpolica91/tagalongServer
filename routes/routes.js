const express = require('express');
const router = express.Router()
const controller = require('../controllers/user.contorller')
const vehicleController = require('../controllers/vehicleController')

router.post('/new', controller.createUser)
router.put('/user/:id', vehicleController.addVehicle)

router.post('/newUser', controller.createUser)
// router.post('/authUser', controller.authUser)





module.exports = router