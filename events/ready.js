const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    execute(guild) {
        guild.user.setActivity("the soul 🌌", { type: ActivityType.Watching });

        console.log('beep boop!');
    }
};