const express = require('express');
const router = express.Router()
const User = require('../Models/User.model')

router.post("/new", (req, res, next) => {
    User.create(req.body)
        .then(user => res.json(user))
})



module.exports = router