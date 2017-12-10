'use strict';

var _callback_api = require('amqplib/callback_api');

var _callback_api2 = _interopRequireDefault(_callback_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_callback_api2.default.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';

        ch.assertQueue(q, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});
//# sourceMappingURL=recive.js.map