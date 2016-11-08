"use strict";

const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');

module.exports = function(app) {
    app.use(logger());
    app.use(cors({exposeHeaders: ['Authorization'], maxAge: 3600}));
    app.use(bodyParser());
};
