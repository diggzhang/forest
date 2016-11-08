'use strict'

const router = require('koa-router')();

/**
 *  Survival test
 */
router.all('/', function *() {
    this.body = 'hi jack'
});

module.exports = router;