const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))

// Middleware
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/', require('./routes'));

// GitHub Auth Route
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

module.exports = app;
