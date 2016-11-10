"use strict";


const Router = require('koa-router');
const EventV4Ctrl = require("../controller/EventsV4");
const router = new Router();


/**
 * @apiMiddleware {POST} /api/v4/events
 * @apiName v4EventsApi
 * @apiGroup v4
 *
 * @apiMiddlewareParam {request header} 从`request header`中抽取`ip`地址并整合到`this.remoteIp`中
 */
router.use("/events", function *(next) {
  let forwardedIpsStr = this.get("X-Forwarded-For");
  let clientIp = this.header["remoteip"];
  if (clientIp) {
    this.remoteIp = clientIp;

    this.remoteIp = forwardedIpsStr.split(",")[0];
  }

  yield next;
});


/**
 * @api {POST} /api/v4/events v4版埋点接收API
 * @apiName v4EventsApi
 * @apiGroup v4
 *
 * @apiParam {JSON} JSON 参考`v4埋点结构`,标志特征是埋点结构扁平化
 *
 * @apiSuccess {None} httpStatus 成功后返回204
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError NotFound request method not found or server crash.
 * @apiError ValidateError request json body validation error
 * @apiError NetworkError request network error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     Body: Not Found
 *
 * @apiErrorExample ValidateError:
 *     HTTP/1.1 400 Validate Error
 *
 * @apiErrorExample NetworkError:
 *     HTTP/1.1 403 Network Error
 */
router.post("/events", function *() {
  yield EventV4Ctrl.save(this.request.body, {ua: this.header["user-agent"], ip: this.remoteIp || this.ip});
  this.status = 204;
});


/**
 * @api {GET} /api/v4/ping v4API存活测试
 * @apiName v4PingPongApi
 * @apiGroup v4
 *
 * @apiParam {None} None 无参
 *
 * @apiSuccess {String} body 成功后body体返回 pong <unix timestamp>
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiError NotFound request method not found or server crash.
 * @apiError ValidateError request json body validation error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     Body: Not Found
 *
 * @apiErrorExample ValidateError:
 *     HTTP/1.1 400 Validate Error
 */
router.get("/ping", function *() {
  this.body = "pong " + Date.now();
});


module.exports = router;
