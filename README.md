# CSV to JSON & JSON to CSV Converter

## Overview

This project is a simple **CSV to JSON** and **JSON to CSV** converter. It allows users to upload a CSV file and convert it into JSON format, or upload a JSON file and convert it into CSV format. The interface is designed to be user-friendly and responsive, meaning it works well on all devices, including mobile phones, tablets, and desktops.

The backend handles file uploads and conversions using **Node.js** and **Express**, while the frontend provides an easy-to-use web interface. The goal is to make file format conversions between CSV and JSON quick and convenient.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Reference](#api-reference)
  - [Convert CSV to JSON](#convert-csv-to-json)
  - [Convert JSON to CSV](#convert-json-to-csv)
- [Backend Information](#backend-information)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## API Reference

This project includes two main API endpoints for file conversion, both using **POST** requests to handle file uploads.

### Convert CSV to JSON

- **URL**: `/api/csv-to-json`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
  
#### Request:

| Parameter | Type       | Description                                  |
|-----------|------------|----------------------------------------------|
| `file`    | `file (.csv)` | The CSV file to be converted to JSON format |

#### Example Request:

```bash
curl -X POST http://localhost:3000/api/csv-to-json \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path_to_your_file.csv"
```

- Response: 200 OK: Returns a JSON object after converting the CSV file.

```json

[
  {
    "column1": "value1",
    "column2": "value2"
  },
  {
    "column1": "value3",
    "column2": "value4"
  }
]
```
- 400 Bad Request: Returned if the file is missing or if the file format is incorrect.

Convert JSON to CSV
- URL: /api/json-to-csv
- Method: POST
- Content-Type: multipart/form-data

#### Request:

| Parameter | Type       | Description                                  |
|-----------|------------|----------------------------------------------|
| `file`    | `file (.json)` | The JSON file to be converted to CSV format |


## Example Request:
``` bash

curl -X POST http://localhost:3000/api/json-to-csv \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path_to_your_file.json"
```

Response:
- 200 OK: Returns a CSV file after converting the JSON object.
```json
[
  {
    "column1": "value1",
    "column2": "value2"
  },
  {
    "column1": "value3",
    "column2": "value4"
  }
]
```
400 Bad Request: 
- Returned if the file is missing, invalid JSON, or not in the correct format.

# Backend Information
The backend for this project is built with Node.js and Express and handles file uploads and conversions between CSV and JSON formats. Below are more details on the backend structure and the main functionality.

## Key Libraries:
- Express: A web framework for Node.js used to handle HTTP requests and routing.
- Multer: Middleware for handling multipart/form-data file uploads.
- csv-parser: Used to parse and convert CSV files into JSON objects.
- json2csv: Utility for converting JSON data back into CSV format.

## Backend Routes:
* CSV to JSON Conversion:
    - Path: /api/csv-to-json
    - Handler: Converts the uploaded CSV file to JSON format.
    - File: src/controllers/convertController.js (function csvToJsonHandler).

- JSON to CSV Conversion:
    - Path: /api/json-to-csv
    - Handler: Converts the uploaded JSON file to CSV format.
   - File: src/controllers/convertController.js (function jsonToCsvHandler).

## Middleware:
- File Filter:
  - Middleware to filter files by their MIME types and only accept .csv for the CSV to JSON route and .json for the JSON to CSV route.
  - File: src/middlewares/fileFilter.js.

# Error Handling:
The project includes basic error handling for common issues such as:

- Invalid file format
- Missing file upload
- Conversion errors (e.g., invalid JSON structure)




## To deploy this project run

```bash
  npm install
```
## Run the Application (Prod) 

```bash
  npm start
```

## Run the Application (Dev) 

```bash
  npm dev
```
## Build for Production:

```bash
  npm run build
```

## Usage
Convert CSV to JSON:

Navigate to the CSV to JSON card.
Click Choose CSV File and select a valid .csv file.
Press Convert to JSON.
The file will be converted, and a JSON download will be triggered.
Convert JSON to CSV:

Navigate to the JSON to CSV card.
Click Choose JSON File and select a valid .json file.
Press Convert to CSV.
The file will be converted, and a CSV download will be triggered.
Error Handling:

If an invalid file format is uploaded, an error message will be displayed, indicating that the file is unsupported.
## File Structure
```bash
├── src/
│   ├── app.js                     # Main application file
│   ├── controllers/
│   │   └── convertController.js    # Handles file conversion logic
│   ├── routes/
│   │   └── convertRoutes.js        # Defines routes for conversion
│   ├── utils/
│   │   ├── csvToJson.js            # Utility to convert CSV to JSON
│   │   └── jsonToCsv.js            # Utility to convert JSON to CSV
│   ├── public/
│   │   ├── index.html              # HTML for the frontend
│   │   ├── styles.css              # Styling for the frontend
│   │   └── app.js                  # Client-side form handling
│   ├── middlewares/
│   │   └── fileFilter.js           # Middleware for file filtering
├── .gitignore                      # Ignoring files from Git
├── package.json                    # NPM dependencies and scripts
├── package-lock.json               # Lockfile for exact dependencies
└── README.md                       # This README file
```
## Contributing

I welcome contributions! To contribute to this project:

* Fork the repository.
* Create a new branch `(git checkout -b feature-branch)`.
* Make your changes.
* Commit your changes `(git commit -m 'Add new feature')`.
* Push to the branch `(git push origin feature-branch)`.
* Open a Pull Request

Please adhere to this project's `code of conduct`.  Feel free to open issues and submit feature requests!.


## License
License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for more details.


