const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routes = require('./routes/routes')
const mongoose = require('mongoose');
const socketManager = require('./socket.manager')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
    .connect('mongodb://localhost/TagAlong', { useNewUrlParser: true, useCreateIndex: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });



io.on('connection', socketManager)


// app.use((req, res, next) => {
//     req.io = io;
//     req.connectedUsers = connectedUsers;
//     return next();
// });

app.use(cors())
app.use(express.json())
app.use("/", routes)

server.listen(5000)