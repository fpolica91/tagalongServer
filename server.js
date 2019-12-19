require('dotenv').config()

var sticky = require('sticky-session'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    cluster = require('cluster'),
    cpus = require('os').cpus().length

require('./config/db/db.setup')
var app = express(), io;
server = http.Server(app);
const cors = require('cors')
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const User = require('./Models/User.model')
const Event = require('./Models/Events.model')
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json())


app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 5000
    })
}));



// // ====================PASSPORT MIDDLEWARE==========================
// PASSPORT CONFIG (VERSION 1)
// app.use(session({ secret: "anything" }))
require('./config/passport.setup.js')(app)





// // PASSPORT MIDDLEWARE (IRONHACK BOILERPLATE)
// require('./config/passport.setup.js')(app)

// PASSPORT MIDDLEWARE VERSION 2
// const passport = require('passport')    
// require('./config/passport-config')(passport)
// app.use(passport.initialize());
// app.use(passport.session());
// ====================PASSPORT MIDDLEWARE==========================

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))
// app.use(cors())
app.use(routes)

const port = 5000












io = socketIO(server);
io.on('connection', socket => {

    console.log('new conection established')
    socket.on('init_communication', () => {
        console.log('this is the initial communication')
        User.find({}).select('username')
            .then(users => {
                console.log('this emit gets the users')
                io.sockets.emit('users', users)
            })
            .catch(err => res.json(err))

        Event.find().populate('host', 'username email').populate('vehicles')
            // THIS POPULATES THE HOST AND THE VEHICLE
         
            .then(events => {
                console.log('this emit gets all the events')
                socket.emit('events', events)
            })

        app.post('/event', (req, res, _) => {
            console.log(req.body)
            Event.create(req.body)
                .then(event => {
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



if (!sticky.listen(server, port)) {
    server.once('listening', function () {
        console.log('Server started on port ' + port);
    });

    if (cluster.isMaster) {
        for (let i = 0; i < cpus.length; i++) {
            cluster.fork()
        }
        console.log('Master server started on port ' + port);

    }
}
else {
    console.log('- Child server started on port ' + port + ' case worker id=' + cluster.worker.id);
}


app.use((req, res, next) => {
    req.io = io;
    return next()
})



//OLD WAY POPULATING MONGOOSE
// .populate({
     // path: "host",
     // model: "User",
     // populate: {
     //     path: 'vehicles',
     //     model: "Vehicle"
     // }
// })



