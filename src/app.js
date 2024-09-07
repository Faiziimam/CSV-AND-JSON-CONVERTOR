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

// frontend 
app.use(express.static(path.join(__dirname, 'public')));

// Middleware 
app.use(helmet()); // Security headers
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));


app.use(cors({origin: '*'}));

// Routes
app.use('/api', convertRoutes);
app.use('/api',healthCheck)

// Error Handling Middleware
app.use(errorHandler);

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
