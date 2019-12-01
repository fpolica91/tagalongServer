const io = require('./server').io
const User = require('./Models/User.model')

module.exports = function (socket) {
    console.log('user connnected to socket')
    User.find({})
        .then(users => {
            socket.emit('users', users)
        })
        .catch(err => console(err))
}