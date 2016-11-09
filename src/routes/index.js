"use strict";


const router = require("koa-router")({"prefix": "/api"});


/**
 * router mount
 */
router.use("/v4/events", require("../routes/eventv4").routes());


/**
 *  Survival API test
 */
router.all("/", function *() {
    this.body = "hi jack";
});


module.exports = router;