"use strict";


const router = require("koa-router")({"prefix": "/api"});


router.use("/v4", require("../routes/v4Api").routes());


/**
 * @api {GET} /api/ping ping-pong test
 * @apiName PingPingTest
 * @apiGroup ForAll
 *
 * @apiParam {None} None 无参
 *
 * @apiSuccess {String} body 成功后body体返回 pong <unix timestamp>
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     pong 1478679370262
 *
 * @apiError NotFound request method not found or server crash.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     Body: Not Found
 */
router.all("/ping", function *() {
  this.body = "pong " + Date.now();
});


module.exports = router;
