const { AttachmentBuilder, Client, IntentsBitField, SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');
const Tablet = require('../lib/Tablet');
const TestApplication = require('../lib/defaultApplications/TestApplication');
dotenv.config();

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds]
});

client.on('ready', async () => {
    await client.application.commands.fetch();
    if (!client.application.commands.cache.some(a => a.name === 'tablet')) await client.application.commands.create(new SlashCommandBuilder().setName('tablet').setDescription('Show a test tablet'));

    if (process.env.CHANNEL_ID) {
        const tablet = new Tablet({ applications: [new TestApplication()] });

        await client.channels.cache.get(process.env.CHANNEL_ID)?.send({ files: [new AttachmentBuilder().setFile(await tablet.render())] });

        process.exit(0);
    }

    console.log('Ready !');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'tablet') {
        const tablet = new Tablet();

        interaction.reply({ files: [new AttachmentBuilder().setFile(await tablet.render())] });
    }
});

client.login(process.env.BOT_TOKEN);