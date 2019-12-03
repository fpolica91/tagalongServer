const passport = require('passport')
require('./serializer')
require('./local.strategy')

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}