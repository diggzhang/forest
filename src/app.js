"use strict";


if (process.env.NODE_ENV == 'production') {
  console.info('Forest Production Mode');
} else {
  console.info('Forest Dev Mode');
}


const app = require("koa")();
const config = require("./config/config");


app.listen(config.port);
