const passport = require('passport');

const auth = passport.authenticate('github', { failureRedirect: '/api-docs', session: false });

const authorize = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = { auth, authorize };