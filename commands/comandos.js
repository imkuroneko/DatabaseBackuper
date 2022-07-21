const { prefix } = require('../config/bot.json');

module.exports = {
    name: 'comandos',
    description: '📎 Lista de comandos',
    execute(client, message, args) {

        items = [];
        client.listaComandos.forEach(cmd => {
            if(cmd.name != 'comandos') { items.push({ name: `**${prefix}${cmd.name}**`, value: cmd.description }); }
        });

        const embed_content = [{
            color: 0x4bbae3,
            title: '🛢 Database Backuper',
            fields: items,
        }];

        return message.reply({ embeds: embed_content });
    }
};
