const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret || sessionSecret.length < 32) {
    throw new Error('SESSION_SECRET must be configured with at least 32 characters');
}

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',').map(origin => origin.trim()).filter(Boolean);
const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
};
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

app
    .use(bodyParser.json())
    .use(cors(corsOptions))
    .use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        },
    }))
    .use(passport.initialize())
    .use(passport.session());

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
