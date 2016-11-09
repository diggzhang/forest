"use strict";


const Router = require('koa-router');
const EventV4 = require("../controller/EventsV4");
const router = new Router();


/**
 * @type {Router|exports|module.exports}
 */
router.use("/", function *(next) {
    let forwardedIpsStr = this.get("X-Forwarded-For");
    let clientIp = this.header["remoteip"];
    if (clientIp) {
        this.remoteIp = clientIp;

        this.remoteIp = forwardedIpsStr.split(",")[0];
    }

    yield next;
});


/**
 * Main API
 * POST 204 /api/v4/events
 */
router.post("/", function *() {
    yield EventV4.save(this.request.body, {ua: this.header["user-agent"], ip: this.remoteIp || this.ip});
    this.status = 204;
});


router.get("/", function *() {
    this.body = "hello get me";
});


module.exports = router;