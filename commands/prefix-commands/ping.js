export default {
    name: 'ping',
    description: 'Ping command, replies with pong.',
    execute(client, message, args) {
      message.reply('Pong! 🏓');  
    },
  };
  