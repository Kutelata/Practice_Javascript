
// const { EmbedBuilder, WebhookClient } = require('discord.js');

// const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/1105519032402194512/o5vmLZlTuiAjskYGuGUHlqVyjTuIZ6PmlQti-2YRq3KLSdsXTCRbTEtIW4t67q0PLZKS' });

// const embed = new EmbedBuilder()
// 	.setTitle('Some Title')
// 	.setColor(0x00FFFF);

// webhookClient.send({
// 	content: 'Webhook test',
// 	username: 'some-username',
// 	avatarURL: 'https://i.imgur.com/AfFp7pu.png',
// 	embeds: [embed],
// });

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [ 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.content === "Hello") {
        message.reply("Chào ngài!")
    }
    if (message.content === "Ai đần nhất") {
        message.reply("Tiến huy!")
    }
});

client.login("MTEwNTUyNjE4MDE1MDUxMzY2NA.GSp7u5.7383avn5Yzkvl_LobGLVm7vYqaUMUm3kdWnFGE");