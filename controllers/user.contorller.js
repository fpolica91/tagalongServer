const User = require('../Models/User.model')
const bcrypt = require('bcryptjs')
const passport = require('passport')


module.exports = {
    createUser(req, res) {
        console.log(req.body)
        const { username, password, email } = req.body
        if (username === "" || password === "" || email === "") {
            res.status(401).json({ message: "Please fill all the required fields" })
        } else {
            User.find({ username })
                .then(users => {
                    if (users.length > 0) {
                        console.log("USER FOUND!")
                        res.json({ message: "Username already exists" })
                    } else {

                        const bcryptsalt = 10;
                        const salt = bcrypt.genSaltSync(bcryptsalt)
                        const encryptedPassword = bcrypt.hashSync(password, salt)

                        User.create({ username, password: encryptedPassword, email })
                            .then(user => {
                                console.log("NEW USER!")
                                res.json(user)
                            }).catch(err => console.log("An error just happened while signing up ", err))
                    }
                }).catch(err => console.log(err))
        }
    }
}
    // USER AUTHENTICATE GOES HERE
//     authenticate(req, res, next) {
//        console.log(req.body)
// }

       // passport.authenticate('local', function (err, user, info) {
        //     if (err || (!user)) {
        //         res.status(500).json({ message: "unexpected error ", err })
        //         return
        //     }
        //     req.login(user, (err) => {
        //         if (err) {
        //             res.status(500).jason({ message: "error authenticating" })
        //             return
        //         }
        //         res.status(200).json({ user })
        //     })
        // })(req, res)



