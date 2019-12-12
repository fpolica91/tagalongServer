const Vehicle = require('../Models/Vehicle.model')
const User = require('../Models/User.model')

module.exports = {
    addVehicle(req, res) {
        const { model, seats } = req.body
        const { id } = req.params
        try {
            User.findById(id)
                .then(user => {
                    if (!user) {
                        res.json({ message: "cannot find user please log in" })
                    }
                    Vehicle.create({
                        owner: user._id,
                        model: model,
                        seats: seats
                    })
                        .then(vehicle => {
                            user.vehicles.push(vehicle._id)
                            user.save()
                        })
                }).then(user => {
                    res.json(user)
                })
                .catch(err => console.log(err))
        } catch (err) {
            res.json(err)
        }
    }
}