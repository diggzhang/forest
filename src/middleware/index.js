"use strict";


const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("kcors");
const errorTrace = require("../middleware/error-trace");
const router = require('../routes');


module.exports = function(app) {
    app.use(logger());
    app.use(cors(
        {
            "exposeHeaders": ["Accept-Ranges", "Content-Encoding",
                              "Content-Length", "Content-Range", "Authorization"],
            "maxAge": "3600"
        }
    ));
    app.use(errorTrace());
    app.use(bodyParser({"jsonLimit":"16mb"}));
    app.use(router.routes());
};
