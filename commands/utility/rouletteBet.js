const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/GitHub/Perch-discord_bot/firebase/firebase.js');

async function bet(interaction, amount, type) {
    const userId = interaction.user.id;
    const db = admin.database();
	const pointsRef = db.ref(`users/${userId}/points`);

	await pointsRef.once('value', snapshot => {
        if (snapshot.exists()) {
            const points = snapshot.val();
        } else {
            interaction.reply(`Nie znaleziono punktów użytkownika.`);
			return;
        }
	});
	if (amount < points) {
		interaction.reply(`Nie wystarczająca ilość punktów na koncie.`);
	} else {
		const userRef = db.ref(`roulette/${userId}/bet/${type}`);
		await userRef.set({
			Amount: amount
		});
	
		await interaction.reply(`Ustawiono zakład: ${amount}, na: ${type}`);
	}
    
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bet')
		.setDescription('Bet your points!')
		.addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Ilość punktów do obstawienia.')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('type')
				.setDescription('BLACK, RED, GREEN lub liczba 1-36.')
				.setRequired(true)),
	async execute(interaction) {
		const type = interaction.options.getString('type');
        const amount = interaction.options.getInteger('amount');
		await bet(interaction, amount, type);
	},
};