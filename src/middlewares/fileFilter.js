// src/middlewares/fileFilter.js
const path = require('path');

const csvFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.csv') {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed for this endpoint'), false);
  }
};

const jsonFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.json') {
    cb(null, true);
  } else {
    cb(new Error('Only JSON files are allowed for this endpoint'), false);
  }
};

module.exports = {
  csvFileFilter,
  jsonFileFilter
};
