"use strict";

var mongoose = require('mongoose');
require('require-dir')('.', {recurse: true});

let model = {
  EventV4: mongoose.model('EventV4')
};

module.exports = model;
