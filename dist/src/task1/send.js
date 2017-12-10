'use strict';

var _callback_api = require('amqplib/callback_api');

var _callback_api2 = _interopRequireDefault(_callback_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_callback_api2.default.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        ch.assertQueue(q, { durable: false });
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer('Supcio'));
        console.log(" [x] Sent 'Hello World!'");
    });
    setTimeout(function () {
        conn.close();process.exit(0);
    }, 500);
});
//# sourceMappingURL=send.js.map