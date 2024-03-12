const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/Perch2/firebase/firebase.js');

async function personalBests(interaction, targetUsername){
    const targetUser = interaction.guild.members.cache.find(member => member.user.username === targetUsername);

    if (targetUser) {
        const db = admin.database();
        const userRef = db.ref("users/" + targetUser.id + "/personalBest/");
        
        await userRef.once('value', snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const recordsList = Object.entries(userData)
                    .map(([fish, data]) => `- ${fish}: \n\tRozmiar: ${data.Rozmiar}cm, \n\tWaga: ${data.Waga}kg,\n\tMiejsce: ${data.Miejsce}`)
                    .join('\n');
                
                interaction.reply(`Rekordy użytkownika ${targetUsername}:\n${recordsList}`);
            } else {
                interaction.reply(`Nie znaleziono rekordów użytkownika ${targetUsername}.`);
            }
        }, errorObject => {
            console.log('The read failed: ' + errorObject.name);
            interaction.reply(`Wystąpił błąd podczas odczytu danych użytkownika ${targetUsername}.`);
        });
    } else {
        interaction.reply(`Nie znaleziono użytkownika ${targetUsername}.`);
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lifecatches')
		.setDescription('To już rutyna. Biję rekord, a potem robię o nim wykład. Do momentu, kiedy zdobędę następny.')
        .addStringOption(option =>
            option.setName('nick')
                .setDescription('Jak się nazywasz, wiedźminie?')
                .setRequired(true)),
	async execute(interaction) {
		const targetUsername = interaction.options.getString('nick');
        await personalBests(interaction, targetUsername);
	},
};