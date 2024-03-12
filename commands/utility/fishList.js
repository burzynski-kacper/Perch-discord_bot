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
		.setName('list')
		.setDescription('Lista ryb.'),

	async execute(interaction) {
        const fishList = fishes.map(fish => `- ${fish}`).join('\n');
        await interaction.reply(`Lista ryb:\n${fishList}`);
	},
};