const Vehicle = require('../Models/Vehicle.model')

module.exports = {
    addVehicle(req, res) {
        const { model, seats } = req.body
        const { id } = req.params
        Vehicle.create({
            owner: id,
            model: model,
            seats: seats
        })
            .then(vehicle => res.json(vehicle))
            .catch(err => console.log(err))
    }
}