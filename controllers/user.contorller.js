const User = require('../Models/User.model')
const Vehicle = require('../Models/Vehicle.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')



module.exports = {
    async createUser(req, res) {
        const { username, password, email, hometown } = req.body
        if (username === "" || password === "" || email === "") {
            res.json({ message: "Please fill all the required fields" })
        } else {
            const userExists = await User.find({ username: username })
            if (userExists.length) {
                return res.json({ success: false, message: "user already exist" })
            }

            const bcryptsalt = 10;
            const salt = bcrypt.genSaltSync(bcryptsalt)
            const encryptedPassword = bcrypt.hashSync(password, salt)

            const user = await User.create({
                username,
                password: encryptedPassword,
                email,
                hometown
            })

            await user.save()
            return res.json(user)
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




