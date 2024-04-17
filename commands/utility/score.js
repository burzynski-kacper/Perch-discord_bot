const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/GitHub/Perch-discord_bot/firebase/firebase.js');

async function getUserPoints(interaction) {
    const db = admin.database();
    const userId = interaction.user.id;
    const pointsRef = db.ref(`users/${userId}/points`);

    await pointsRef.once('value', snapshot => {
        if (snapshot.exists()) {
            const points = snapshot.val();
            interaction.reply(`Twój wynik: ${points}`);
        } else {
            interaction.reply(`Nie znaleziono punktów użytkownika.`);
        }
    }, errorObject => {
        console.log('The read failed: ' + errorObject.name);
        interaction.reply(`Wystąpił błąd podczas odczytu punktów użytkownika.`);
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription('Wyświetla liczbę punktów użytkownika.'),
    async execute(interaction) {
        await getUserPoints(interaction);
    },
};