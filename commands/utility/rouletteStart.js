const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/GitHub/Perch-discord_bot/firebase/firebase.js');

async function start(){
	const db = admin.database();
    const dbRef = db.ref(`roulette/`);
    await dbRef.once('value', snapshot => {
        if (!snapshot.exists()) {
            interaction.reply(`Nie znaleziono aktywnych zakładów.`);
			return;
        }
            const number = Math.floor(Math.random() * 37);
        
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roulettestart')
		.setDescription('Start roulette!'),
	async execute(interaction) {
		await start();
	},
};