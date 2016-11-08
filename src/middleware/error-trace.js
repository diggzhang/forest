"use strict";

module.exports = function errorTrace() {
    return function *(next) {
        try {
            yield next;
        }
        catch (err) {
            // debug detail
            console.error(Date.now());
            console.error(this.url);
            console.error(this.request.body);

            // mongoose error
            if (err.name == 'ValidationError') {
                err.status = 400;
                console.error(err);
            }
            if (err.status == 401 && this.header['client-type'] === 'android-app') { // for android use
                this.set('WWW-Authenticate', 'Basic realm="fake"');
            }

            this.body = {msg: err.message};
            this.status = err.status || 500;
            this.app.emit('error', err, this);

            // return http status 204 is to ensure that the client retransmission event
            this.status = 204;
        }
    }
};
