const { SlashCommandBuilder } = require('discord.js');
const admin = require('D:/Coding/Perch2/firebase/firebase.js');

async function newLifeCatch(interaction, fishName, size, weight, place) {
    const userId = interaction.user.id;
    const db = admin.database();
    const userRef = db.ref(`users/${userId}/personalBest/${fishName}`);

    await userRef.set({
        Rozmiar: size,
        Waga: weight,
        Miejsce: place
    });

    await interaction.reply(`Dodano/aktualizowano nową złowioną rybę: ${fishName}`);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newlifecatch')
		.setDescription('Złapałem potwora! Ta ryba jest większa niż moja łódź!')
        .addStringOption(option =>
            option.setName('nazwa')
                .setDescription('Nazwa złowionej ryby.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('miara')
                .setDescription('Długość złowionej ryby (w centymetrach).')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('waga')
                .setDescription('Waga złowionej ryby (w kilogramach).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('miejsce')
                .setDescription('Miejsce złowienia ryby.')
                .setRequired(true)),
	async execute(interaction) {
        const fishName = interaction.options.getString('nazwa');
        const size = interaction.options.getInteger('miara');
        const weight = interaction.options.getInteger('waga');
        const place = interaction.options.getString('miejsce');

        await newLifeCatch(interaction, fishName, size, weight, place);
	},
};