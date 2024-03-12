const { SlashCommandBuilder } = require('discord.js');

const valChamps = [
    'phoenix',
    'raze',
    'jett',
    'yoru',
    'neon',
    'reyna',
    'sage',
    'cypher',
    'chamber',
    'killjoy',
    'omen',
    'viper',
    'brimstone',
    'astra',
    'harbor',
    'sova',
    'breach',
    'skye',
    'kayo',
    'fade'
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomchamp')
		.setDescription('Niespodziewane wydarzenia wymagają użycia niespodziewanych środków.'),
	async execute(interaction) {
        const picked = valChamps[Math.floor(Math.random() * valChamps.length)]
		await interaction.reply({ files: [`champs-images/${picked}.png`] });
	},
};
