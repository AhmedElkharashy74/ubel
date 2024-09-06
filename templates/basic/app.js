const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db')

// Middleware setup
app.use(cors());              // Enable Cross-Origin Resource Sharing
app.use(helmet());            // Secure HTTP headers
app.use(bodyParser.json());   // Parse JSON bodies (body-parser)
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());      // Parse JSON bodies (Express built-in)
connectDB();
// Routes setup
// app.use('/api', routes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});