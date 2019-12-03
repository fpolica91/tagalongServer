const Vehicle = require('../Models/Vehicle.model')

module.exports = {
    addVehicle(req, res) {
        const { model, seats } = req.body
        const { id } = req.params
        if (!id) {
            res.jason({ success: false, message: "error while adding new vehicle" })
        }
        Vehicle.create({
            owner: id,
            model: model,
            seats: seats
        })
            .then(vehicle => {
                console.log(`created a new ${vehicle}`)
                res.json(vehicle)
            })
            .catch(err => console.log(err))
    }
}