// src/utils/jsonToCsv.js
const { Parser } = require('json2csv');

const jsonToCsv = (jsonData) => {
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(jsonData);
    return csv;
  } catch (error) {
    throw error;
  }
};

module.exports = jsonToCsv;
