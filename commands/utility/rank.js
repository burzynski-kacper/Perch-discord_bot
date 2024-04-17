const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/GitHub/Perch-discord_bot/firebase/firebase.js');

async function displayTopUsersByPoints(interaction) {
    const db = admin.database();
    const usersRef = db.ref("users");

    try {
        const snapshot = await usersRef.once('value');
        if (snapshot.exists()) {
            const usersData = snapshot.val();
            // Tworzymy tablicę z użytkownikami i ich punktami
            let usersPoints = [];
            for (const userId in usersData) {
                const points = usersData[userId].points || 0;
                // Pobieramy nick użytkownika z serwera Discord
                const member = await interaction.guild.members.fetch(userId).catch(console.error);
                const username = member ? member.nickname || member.user.username : "Nieznany Użytkownik";
                usersPoints.push({ username, points });
            }
            // Sortujemy użytkowników według punktów
            usersPoints.sort((a, b) => b.points - a.points);
            // Tworzymy wiadomość z listą
            const messageLines = usersPoints.map((user, index) => `${index + 1}. ${user.username} - ${user.points}`);
            await interaction.reply(messageLines.join('\n'));
        } else {
            await interaction.reply(`Nie znaleziono danych użytkowników.`);
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        await interaction.reply(`Wystąpił błąd podczas pobierania danych użytkowników.`);
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Dead Pool'),
    async execute(interaction) {
        await displayTopUsersByPoints(interaction);
    },
};
