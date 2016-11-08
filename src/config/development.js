"use strict";

const development = {
    host: 'localhost',
    port: process.env.NODE_PORT || 4500,
    db: 'mongodb://10.8.8.111/koala_dev',
    opt: {
        server: {
            socketOptions: { keepAlive: 1 },
            poolSize: 100
        }
    }
};

module.exports = development;
