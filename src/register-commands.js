require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'calculate',
        description: 'Perform a calculation',
        options: [
          {
            name: 'expression',
            description: 'The mathematical expression to calculate',
            type: 3,
            required: true,
          },
        ],
      },
      {
      name: 'embed',
      description: 'Send shyyns profile',
    },
    ];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands were registered successfully');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
