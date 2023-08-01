const amqp = require('amqplib');

async function subscriber() {
  try {
    // Conectando ao servidor RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Criando um tópico
    const exchange = 'meu_topico';
    const exchangeType = 'topic';
    await channel.assertExchange(exchange, exchangeType);

    // Criando uma fila anônima exclusiva para este consumidor
    const result = await channel.assertQueue('', { exclusive: true });
    const queueName = result.queue;

    // Binding da fila ao tópico com uma chave de roteamento específica
    const routingKey = 'chave404'; // Exemplo de chave de roteamento
    await channel.bindQueue(queueName, exchange, routingKey);

    // Configurando a função de callback para receber as mensagens
    channel.consume(
      queueName,
      (msg) => {
        if (msg.content) {
          console.log(`[x] Received: ${msg.content.toString()}`);
        }
      },
      { noAck: true }
    );

    console.log(' [*] Waiting for messages. To exit, press CTRL+C');
  } catch (error) {
    console.error('Erro:', error);
  }
}

subscriber();
