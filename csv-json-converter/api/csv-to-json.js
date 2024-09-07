const csvParser = require('csv-parser');
const multer = require('multer');
const fs = require('fs');

// Multer to handle file upload in /tmp directory (serverless environment)
const upload = multer({ dest: '/tmp' });

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: 'File upload error' });
      }

      const filePath = req.file.path;
      const results = [];

      // Read and parse the CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          res.status(200).json(results);
        })
        .on('error', (error) => {
          res.status(500).json({ error: 'Error reading file' });
        });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
