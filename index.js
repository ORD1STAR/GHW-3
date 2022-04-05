const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

const config = require('./config.json');
const roleClaim = require('./role-claim');
client.on('ready', () => {
    console.log(`Logged in !`);
    roleClaim(client);
    }
);

client.login(config.token);
