'use strict';

var _callback_api = require('amqplib/callback_api');

var _callback_api2 = _interopRequireDefault(_callback_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_callback_api2.default.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, channel) {
        var queueName = 'task_queue';
        channel.assertQueue(queueName, { durable: true });

        // In order to defeat that we can use the prefetch method with the value of 1.
        // This tells RabbitMQ not to give more than one message to a worker at a time.
        // Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
        // Instead, it will dispatch it to the next worker that is not still busy.
        channel.prefetch(1);

        channel.consume(queueName, function (msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg); //confirm processing completion
            }, secs * 1000);
        }, { noAck: false }); //confirm that message was processed
    });
});
//# sourceMappingURL=worker.js.map