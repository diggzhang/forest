'use strict'


const EventV4 = require("../controller/EventsV4");
const router = require("koa-router")({"prefix":"/api"});


/**
 *  Survival API test
 */
router.all("/", function *() {
    this.body = "hi jack";
});


/**
 * Main API
 * POST 204 /api/v4/events
 */

router.use("/v4/events", function *(next) {
    let forwardedIpsStr = this.get("X-Forwarded-For");
    let clientIp = this.header["remoteip"];
    if (clientIp) {
        this.remoteIp = clientIp;
    } else if (forwardedIpsStr) {
        this.remoteIp = forwardedIpsStr.split(",")[0];
    }

    yield next;
});

router.post("/v4/events", function *() {
    yield EventV4.save(this.request.body, {ua: this.header["user-agent"], ip: this.remoteIp || this.ip});
    this.status = 204;
});


module.exports = router;