const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const fishes = [
    'Boleń',
    'Jaź', 
    'Jelec', 
    'Jesiotr',
    'Karaś', 
    'Karp',
    'Kleń',
    'Leszcz',
    'Lin',
    'Okoń',
    'Płoć',
    'Rozpiór',
    'Sandacz',
    'Sum',
    'Szczupak',
    'Ukleja',
    'Węgorz',
    'Wzdręga',
    'Żaglica'
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Pokazuje rybke.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Nazwa bydlaka.')
                .setRequired(true)),

	async execute(interaction) {
		const fishName = interaction.options.getString('name');
        if (!fishes.includes(fishName)) {
            await interaction.reply('Tego nie mamy w bazie.');
            return;
        }

        const imagePath = `./fish-images/${fishName}.png`;
        if (fs.existsSync(imagePath)) {
            await interaction.reply({ files: [imagePath] });
        } else {
            await interaction.reply('Nie ma zdjecia.');
            console.log(imagePath);
        }
	},
};