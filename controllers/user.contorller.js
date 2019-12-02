const User = require('../Models/User.model')
const Event = require('../Models/Events.model')
const bcrypt = require('bcryptjs')



module.exports = {
    createUser(req, res) {
        //console.log(req.body)
        const {username, password, email} = req.body
        if(username === "" || password === "" || email === ""){
            res.status(401).json({message: "Please fill all the required fields"})
        }else{
            User.find({username})
            .then(users => {
                if(users.length > 0){
                res.status(401).json({message: "Username already exists"})
                }else{

                    const bcryptsalt = 10;
                    const salt = bcrypt.genSaltSync(bcryptsalt)
                    const encryptedPassword = bcrypt.hashSync(password, salt)

                   User.create({username, password: encryptedPassword, email})
                   .then(user => {
                       console.log(user)
                   }).catch(err => console.log("An error just happened while signing up ", err))
                }
            }).catch(err => console.log(err))
        }



        // User.create(req.body)
        //     .then(user => {
        //         res.json(user)
        //     })
    }


}