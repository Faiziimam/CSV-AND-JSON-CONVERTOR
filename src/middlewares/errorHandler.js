// src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (res.headersSent) {
      return next(err);
    }
    
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Multer file upload errors
    if (err.name === 'MulterError') {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          message = 'File size is too large';
          statusCode = 413;
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          message = 'Unexpected file field';
          statusCode = 400;
          break;
        default:
          message = err.message;
          statusCode = 400;
      }
    } else if (err.message === 'Only CSV files are allowed for this endpoint' ||
               err.message === 'Only JSON files are allowed for this endpoint') {
      message = err.message;
      statusCode = 400;
    } else if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
      message = 'Invalid JSON';
      statusCode = 400;
    } else if (err.message.startsWith('Unexpected token')) {
      message = 'Invalid JSON format';
      statusCode = 400;
    } else if (err.message.includes('ENOENT')) {
      message = 'File not found';
      statusCode = 404;
    }
  
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = errorHandler;
  