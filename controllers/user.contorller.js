const User = require('../Models/User.model')




module.exports = {
    createUser(req, res) {
        User.create(req.body)
            .then(user => {
                res.json(user)
            })
    },
    authenticateUser(req, res) {

    }
}