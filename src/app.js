const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
// const routes = require('./routes');
require('dotenv').config();

// Middleware setup
app.use(cors());              // Enable Cross-Origin Resource Sharing
app.use(helmet());            // Secure HTTP headers
app.use(bodyParser.json());   // Parse JSON bodies (body-parser)
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());      // Parse JSON bodies (Express built-in)

// Routes setup
// app.use('/api', routes);

module.exports = app;
