const express = require('express');

const router = express.Router();


router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    statusCode:res.statusCode
  });
});

module.exports = router

