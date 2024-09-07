// src/controllers/convertController.js
const fs = require('fs');
const path = require('path');
const csvToJson = require('../utils/csvToJson');
const jsonToCsv = require('../utils/jsonToCsv');

const csvToJsonHandler = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;

  try {
    const jsonData = await csvToJson(filePath);
    res.json(jsonData);
  } catch (error) {
    next(error);
  } finally {
    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file: ${filePath}`, err);
    });
  }
};

const jsonToCsvHandler = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;

  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);

    if (!Array.isArray(jsonData)) {
      return res.status(400).json({ error: 'JSON data must be an array of objects' });
    }

    const csvData = jsonToCsv(jsonData);

    res.header('Content-Type', 'text/csv');
    res.attachment('output.csv');
    res.send(csvData);
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: 'Invalid JSON format' });
    } else {
      next(error);
    }
  } finally {
    // Clean up uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Error deleting file: ${filePath}`, err);
    });
  }
};

module.exports = {
  csvToJsonHandler,
  jsonToCsvHandler
};
