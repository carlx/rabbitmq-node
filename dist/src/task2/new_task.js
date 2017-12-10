'use strict';

var _callback_api = require('amqplib/callback_api');

var _callback_api2 = _interopRequireDefault(_callback_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getDots = function getDots() {
    var str = '.';
    for (var i = 1; i < getRandomInt(1, 6); i++) {
        str += '.';
    }
    return str;
};

_callback_api2.default.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, channel) {
        var queueName = 'task_queue';
        var msg = process.argv[2];
        // When RabbitMQ quits or crashes it will forget the queues and messages unless you tell it not to.
        // Two things are required to make sure that messages aren't lost: we need to mark both the queue and messages as durable.
        channel.assertQueue(queueName, { durable: true });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
        // Marking messages as persistent doesn't fully guarantee that a message won't be lost.
        // Although it tells RabbitMQ to save the message to disk, there is still a short time window when
        // RabbitMQ has accepted a message and hasn't saved it yet
        for (var i = 0; i < 20; i++) {
            var dots = getDots();
            channel.sendToQueue(queueName, new Buffer(msg + dots), { persistent: true });
            console.log(" [x] Sent '%s'", msg + dots);
        }
    });
    setTimeout(function () {
        conn.close();process.exit(0);
    }, 500);
});
//# sourceMappingURL=new_task.js.map