const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

function loadTxt(file){
    const lines = fs.readFileSync(file, 'utf-8').split('\n');
    return lines.join('\n');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Zdawało mi się, że każdy wie, dokąd ma iść i co ma robić, tylko ja jeden nie.'),
	async execute(interaction) {
		await interaction.reply(loadTxt('./txtFiles/helpList.txt'));
	},
};