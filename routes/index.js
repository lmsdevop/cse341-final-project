const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/users', require('./usersRoutes'));
router.use('/clients', require('./clientsRoutes'));
router.use('/vehicles', require('./vehiclesRoutes'));
router.use('/services', require('./servicesRoutes'));
router.use('/orders', require('./ordersRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => { })

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;