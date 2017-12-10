import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        const q = 'hello';
        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer('Supcio'));
        console.log(" [x] Sent 'Hello World!'");
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
