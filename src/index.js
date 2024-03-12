const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { token } = require('../config.json');
const admin = require('D:/Coding/Perch2/firebase/firebase.js');


//Permisje bota
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent,
		GatewayIntentBits.Guilds,
    ]
})

client.commands = new Collection();
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//Dodawanie punktów do score
function updateUsrPoints(userId, pointsToAdd){
    const db = admin.database();
    const pointsRef = db.ref("users/" + userId + "/points/");
    pointsRef.transaction((currentPoints) => {
        // Jeśli currentPoints nie zostało ustawione, zwróć 0, a następnie dodaj pointsToAdd
        return (currentPoints || 0) + pointsToAdd;
    }, function(error, committed, snapshot) {
        if (error) {
            console.log('Update failed:', error);
        } else if (committed) {
            console.log('User points updated to:', snapshot.val());
        } else {
            console.log('Transaction did not commit for some reason');
        }
    });
}


client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const authorId = message.author.id;
    updateUsrPoints(authorId, 1);
});


client.login(token);