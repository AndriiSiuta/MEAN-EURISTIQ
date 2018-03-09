const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// Listener succsess
mongoose.connection.on('connected', () => {
    console.log('Connected to database'+config.database);
});

// Database Error
mongoose.connection.on('error', (err) => {
    console.log(`Here is error to connect do DB ${errr}`);
});

const app = express();

const users = require('./routes/users');

// CORS MiddleWare
app.use(cors());

// Set Static Fodler
app.use(express.static(path.join(__dirname, 'public')));

// Port Number
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint')
});

// Start Server
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});