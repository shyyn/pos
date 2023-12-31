require('dotenv').config();
const { Client, IntentsBitField, ActivityType, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`❤ ${c.user.id} is online.`);
    client.user.setActivity("I like otters! :3", {
        type: ActivityType.Streaming
    });
})

client.on('messageCreate', (message) => {
  
   if (message.author.bot) {
        return;
    }


    if (message.content === 'hello') {
        message.reply('hi');
    }

    if (message.content === '@everyone') {
        message.reply('@everyone');
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'calculate') {
        const expression = options.getString('expression');

        if (!expression) {
            await interaction.reply('Please provide a valid expression.');
            return;
        }

        try {
            const result = eval(expression);
            await interaction.reply(`Result, <@${interaction.user.id}>: ${result}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('An error has occured while calculating. ');
        }
    }
});

client.login(process.env.TOKEN);
