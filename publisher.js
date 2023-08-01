const readline = require('readline');
const amqp = require('amqplib');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function sendMessage() {
  try {
    // Conectando ao servidor RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Criando um tópico
    const exchange = 'meu_topico';
    const exchangeType = 'topic';
    await channel.assertExchange(exchange, exchangeType);

    const askMessage = async () => {
      rl.question('Digite a mensagem que deseja enviar (ou "C" para sair): ', async (message) => {
        if (message.toLowerCase() === 'c') {
          await connection.close();
          process.exit(0);
        } else {
          // Publicando mensagem no tópico
          const routingKey = 'chave404'; // Exemplo de chave de roteamento
          channel.publish(exchange, routingKey, Buffer.from(message));

          console.log(`[x] Sent '${message}'`);

          askMessage(); // Perguntar novamente por outra mensagem
        }
      });
    };

    askMessage();
  } catch (error) {
    console.error('Erro:', error);
  }
}

sendMessage();
