const { Client, Intents } = require('discord.js');
const config = require('./config.json');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.once('ready', () => {
	console.log('Ready!');
});

bot.login(config.bot.token);


module.exports = bot;