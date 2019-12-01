const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// redis configuration



// end of redis configuration


const routes = require('./routes/routes')
const mongoose = require('mongoose');
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




mongoose
    .connect('mongodb://localhost/TagAlong', { useNewUrlParser: true, useCreateIndex: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });



io.on('connection', socket => {
    console.log('new conection established')
    User.find({})
        .then(users => {
            console.log('this emit gets the users')
            socket.emit('users', users)
        })
        .catch(err => res.json(err))

    Event.find({})
        .then(events => {
            console.log('this emit gets all the events')
            socket.emit('events', events)
        })

    app.post('/event', (req, res, next) => {
        Event.create(req.body)
            .then(event => res.json(event))
            .catch(err => res.json(err))
    })





    socket.on('disconnect', () => {
        console.log(' a user disconnected')
    })


})






app.use("/", routes)

server.listen(process.env.PORT)