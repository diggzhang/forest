"use strict";

const path = require("path");
const extend = require("util")._extend;
const development = require('./development');
const production = require('./production');

const defaults = {
  root: path.normalize(__dirname + "/..")
};


module.exports = {
  development: extend(development, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
