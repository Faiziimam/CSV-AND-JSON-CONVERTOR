// src/app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const convertRoutes = require('./routes/convertRoutes');
const errorHandler = require('./middlewares/errorHandler');
const healthCheck = require('./routes/healthCheckRoutes');

const app = express();

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Setup
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('combined')); // Logging


app.use(cors({
    origin: '*', // Allow all origins, or specify your frontend origin
}));

// Routes
app.use('/api', convertRoutes);
app.use('/api',healthCheck)

// Error Handling Middleware
app.use(errorHandler);

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
