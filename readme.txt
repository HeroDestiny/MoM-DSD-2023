Projeto de fila de mensagens usando node js,o rabbitMQ, a biblioteca amqplib e readline.


readline: Biblioteca que fornece uma interface para leitura de dados a partir do usuário através do console.
amqp: Biblioteca que permite a conexão e interação com o RabbitMQ.

publisher.js:
O código utiliza readline para criar uma interface de leitura de entrada (rl) a partir do console.
process.stdin é a entrada padrão (stdin) do processo, ou seja, o console onde o usuário pode digitar.
process.stdout é a saída padrão (stdout) do processo, onde as mensagens serão exibidas.
sendMessage() esta função é assíncrona (async) e é responsável por conectar-se ao servidor RabbitMQ e enviar mensagens para o tópico.
await amqp.connect('amqp://localhost') realiza a conexão com o servidor RabbitMQ, que está localizado em localhost.
await connection.createChannel() cria um canal de comunicação com o servidor RabbitMQ. É através deste canal que a comunicação ocorrerá.
O exemplo utiliza um tópico chamado 'meu_topico'.
O tipo de troca (exchange) é configurado como 'topic'. RabbitMQ oferece diferentes tipos de troca, e 'topic' é um dos tipos disponíveis.
await channel.assertExchange(exchange, exchangeType) assegura que o tópico exista no servidor. Se não existir, ele será criado.
askMessage() Esta função utiliza readline para perguntar ao usuário a mensagem que ele deseja enviar.
Se o usuário digitar a letra 'C' (ignorando o caso), o aplicativo fecha a conexão com o RabbitMQ e encerra o processo.
Caso contrário, a mensagem é publicada no tópico usando channel.publish().
Após enviar a mensagem, a função se chama recursivamente para perguntar novamente por outra mensagem.
O aplicativo inicia a comunicação chamando a função sendMessage().
O aplicativo fica em execução esperando que o usuário insira mensagens através do console. Cada mensagem digitada será enviada para o tópico definido no RabbitMQ. Para finalizar a aplicação, basta digitar a letra 'C' (ignorando o caso).

subscriber.js:
channel.assertQueue('', { exclusive: true }) cria uma fila exclusiva e anônima para este consumidor. A fila é exclusiva para este consumidor e será excluída quando o consumidor for desconectado do servidor.
const routingKey = 'chave404' é um exemplo de chave de roteamento.
channel.bindQueue(queueName, exchange, routingKey) vincula a fila recém-criada ao tópico com a chave de roteamento específica. Isso significa que este consumidor receberá apenas mensagens enviadas para o tópico que correspondam a essa chave de roteamento.
channel.consume() configura uma função de callback para receber mensagens da fila.
Quando uma mensagem é recebida, a função de callback é acionada.
A mensagem recebida está contida em msg.content como um buffer, e a função imprime seu conteúdo convertendo-o para uma string.