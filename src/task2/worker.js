import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, channel) {
        const queueName = 'task_queue';
        channel.assertQueue(queueName, {durable: true});

        // In order to defeat that we can use the prefetch method with the value of 1.
        // This tells RabbitMQ not to give more than one message to a worker at a time.
        // Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one.
        // Instead, it will dispatch it to the next worker that is not still busy.
        channel.prefetch(1);

        channel.consume(queueName, function(msg) {
            const secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg); //confirm processing completion
            }, secs * 1000);
        }, {noAck: false}); //confirm that message was processed
    });
});