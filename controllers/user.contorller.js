const User = require('../Models/User.model')
const Vehicle = require('../Models/Vehicle.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')



module.exports = {
    async createUser(req, res) {
        const { username, password, email, hometown } = req.body
        if (!username || !passport || !email) {
            res.json({ success: false, message: "Filled all required fields" })
        } else {
            await User.findOne({ $or: [{ username: username }, { email: email }] })
                .then(user => {
                    if (user) {
                        res.json({ success: false, message: "username or email already taken" })
                    } else {
                        const bcryptsalt = 10;
                        const salt = bcrypt.genSaltSync(bcryptsalt)
                        const encryptedPassword = bcrypt.hashSync(password, salt)
                        User.create({ username, email, password: encryptedPassword, hometown })
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => res.json(err))
                    }
                })
                .catch(err => res.json(err))
        }
    },


    async tagRequest(req, res) {



    },

    async createCar(req, res) {
        const { userId, model, seats } = req.body
        Vehicle.create({
            model,
            owner: userId,
            seats
        }).then(newCar => {
            User.findByIdAndUpdate(userId,
                { $push: { vehicles: newCar._id } },
                { new: true, upsert: true },
            )

                .then(userUpdated => {
                    res.json(userUpdated)
                })

        }).catch(err => console.error(err))
    }
}




