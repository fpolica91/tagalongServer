const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./Models/User.model')
const Event = require('./Models/Events.model')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.json())
require('dotenv').config()
require('./config/db/db.setup')




io.on('connection', socket => {
    console.log('new conection established')
    socket.on('init_communication', () => {
        User.find({})
            .then(users => {
                console.log('this emit gets the users')
                io.sockets.emit('users', users)
            })
            .catch(err => res.json(err))

        Event.find({})
            .then(events => {
                console.log('this emit gets all the events')
                socket.emit('events', events)
            })

        app.post('/event', (req, res, _) => {
            Event.create(req.body)
                .then(event => {
                    console.log('this is the new event', event)
                    res.json(event)
                    io.sockets.emit('reload')
                })
                .catch(err => res.json(err))
        })


        // END OF INIT_COMMUNICATION
    })
    socket.on('disconnect', () => {
        console.log(' a user disconnected')
    })

})






app.use("/", routes)

server.listen(process.env.PORT)