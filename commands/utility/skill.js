const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getImageUrl(percentage) {
    if (percentage >= 0 && percentage <= 10) {
        return 'https://i.pinimg.com/564x/80/94/fa/8094fa75e66ff5a0a4d08c3dda0ba5c9.jpg'; 
    } else if (percentage > 10 && percentage <= 20) {
        return 'https://i.pinimg.com/564x/27/77/6c/27776cc292cedb3e2435e3a6b7672cb0.jpg'; 
    } else if (percentage > 20 && percentage <= 30) {
        return 'https://i.pinimg.com/564x/c7/30/39/c730394c9596327258d188ac4028bcb0.jpg'; 
    } else if (percentage > 30 && percentage <= 40) {
        return 'https://i.pinimg.com/564x/7b/a6/59/7ba65908ffdda62884cc6c9b23549823.jpg'; 
    } else if (percentage > 40 && percentage <= 50) {
        return 'https://i.pinimg.com/564x/45/ff/64/45ff6483a63461158467b292f533fe5c.jpg'; 
    } else if (percentage > 50 && percentage <= 60) {
        return 'https://i.pinimg.com/564x/33/84/40/3384409485a5977f2963e0b1f1e7a79e.jpg'; 
    } else if (percentage > 60 && percentage <= 70) {
        return 'https://i.pinimg.com/564x/26/50/a3/2650a3a80fca194d3b70a3103bd44985.jpg'; 
    } else if (percentage > 70 && percentage <= 80) {
        return 'https://i.pinimg.com/564x/c0/da/13/c0da135eeaecd39ccfedf74854770ccf.jpg'; 
    } else if (percentage > 80 && percentage <= 90) {
        return 'https://i.pinimg.com/564x/47/77/1a/47771a16f066147cd3cf2df2e20b2d2f.jpg'; 
    }
    else {
        return 'https://i.pinimg.com/564x/1f/05/50/1f0550f6db7e41e510b5135544af384c.jpg'; 
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skill')
		.setDescription('Potęga może wykonać wszystko, co sobie zażyczy'),
	async execute(interaction) {
		const randomPercentage = Math.floor(Math.random() * 101);

        // Utwórz wiadomość embed
        const embed = {
            color: 0xFF5733, // Kolor tła embeda
            title: 'Twój Skill!',
            description: `Twój skill wynosi: **${randomPercentage}%**`,
            image: {
                url: getImageUrl(randomPercentage)
            }
        };

        // Odpowiedz na interakcję z wiadomością embed
        await interaction.reply({ embeds: [embed] });
    },
};