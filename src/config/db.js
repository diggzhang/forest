"use strict";

var mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, config.opt);

mongoose.connection.on('connected', () => {
  console.info('Database connected')
});

mongoose.connection.on('disconnected', () => {
  console.error('Database disconnected');
  console.info('Exit process');
  process.exit(1);
});

mongoose.connection.on('error', () => {
  console.error('Database disconnected');
  console.info('Exit process');
  process.exit(1);
});

process.on('SIGINT', () => {
  console.warn('app exit');
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close();
  } else {
    process.exit(0);
  }
});
