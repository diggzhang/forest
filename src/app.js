"use strict";


if (process.env.NODE_ENV == 'production') {
  console.info('Forest Production Mode');
} else {
  console.info('Forest Dev Mode');
}


const app = require("koa")();
const config = require("./config/config");

require("./config/db");
require("./middleware")(app);


app.listen(config.port);
