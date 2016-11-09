"use strict";

const production = {
  host: 'localhost',
  port: process.env.NODE_PORT || 3000,
  db: 'mongodb://10.8.8.111/koala',
  opt: {
    auth: {"authdb": "admin"},
    server: {
      socketOptions: {keepAlive: 1},
      poolSize: 100
    }
  }
};

module.exports = production;
