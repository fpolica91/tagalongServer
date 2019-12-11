const passport = require('passport');

require('./serializers')
require('./local.strategy')

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use((req, res, next) => {
    //     res.locals.currentUser = req.user;
    //     next()
    // })
}