const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('../middleware/errorHandler');
const routes = require('../routes');

const configureExpress = (app) => {
  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);

  // Request parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // API routes
  app.use('/api', routes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = configureExpress;