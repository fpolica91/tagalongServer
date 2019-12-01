const User = require('../Models/User.model')
const Event = require('../Models/Events.model')



module.exports = {
    createUser(req, res) {
        User.create(req.body)
            .then(user => {
                res.json(user)
            })
    }
}