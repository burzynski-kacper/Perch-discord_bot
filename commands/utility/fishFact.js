const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

function getRandomLineFromFile(file){
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    const randomIdx = Math.floor(Math.random() * lines.length);
    return lines[randomIdx];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fishfact')
		.setDescription('Rybia ciekawostka!'),
	async execute(interaction) {
		await interaction.reply(getRandomLineFromFile('./txtFiles/curiosities.txt'));
	},
};