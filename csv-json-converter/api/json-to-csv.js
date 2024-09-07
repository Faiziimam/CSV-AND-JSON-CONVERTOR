const { Parser } = require('json2csv');

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const jsonData = req.body; // Expecting JSON in the request body
      const parser = new Parser();
      const csv = parser.parse(jsonData);

      // Send CSV as a response
      res.setHeader('Content-Type', 'text/csv');
      res.status(200).send(csv);
    } catch (error) {
      res.status(500).json({ error: 'Error converting JSON to CSV' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
