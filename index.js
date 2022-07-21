// Load configuration files ================================================================================================
const { token } = require('./config/bot.json');

// Load required resources =================================================================================================
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

// Define client Intents ===================================================================================================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [ Partials.Channel, Partials.Message, Partials.User ]
});

// Discord::Events =========================================================================================================
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of events) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}


// Load prefix commands ====================================================================================================
client.listaComandos = [];
client.commands = new Collection();
const prefixCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const prefixFile of prefixCommandFiles) {
    var command = require(`./commands/${prefixFile}`);
    client.commands.set(command.name, command);
    client.listaComandos.push({ name: command.name, description: command.description });
}

// Define token a init bot =================================================================================================
client.login(token);