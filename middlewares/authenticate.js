const dotenv = require('dotenv');

dotenv.config();

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined && process.env.NODE_ENV != 'test') {
        return res.status(401).json(
            {
                message: "You do not have access. Please Log in with an authorized account."
            })
    }
    next();
};

module.exports = {
    isAuthenticated
}