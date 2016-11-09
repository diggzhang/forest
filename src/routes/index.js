"use strict";


const router = require("koa-router")({"prefix": "/api"});


/**
 * router mount
 */
router.use("/v4/events", require("../routes/eventv4").routes());


/**
 *  Survival API ping-pong test
 */
router.all("/ping", function *() {
    this.body = "pong";
});


module.exports = router;