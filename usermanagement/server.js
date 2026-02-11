const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('tiny'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Database
connectDB();

// View Engine
app.set("view engine", "ejs");

// Static Files (IMPORTANT — using frontend folder)
app.use('/css', express.static(path.resolve(__dirname, "frontend/css")));
app.use('/js', express.static(path.resolve(__dirname, "frontend/js")));

// Routes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
