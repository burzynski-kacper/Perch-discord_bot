const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function getImageUrl(percentage) {
    if (percentage >= 0 && percentage <= 10) {
        return `https://i.pinimg.com/736x/cd/80/c7/cd80c7333f2b2e386822f31676439023.jpg`;
    } else if (percentage > 10 && percentage <= 20) {
        return `https://i.pinimg.com/736x/5e/1e/4f/5e1e4f54f640f02eeba9f615f5c562fc.jpg`;
    } else if (percentage > 20 && percentage <= 30) {
        return `https://i.pinimg.com/236x/ad/c7/8d/adc78dd3ec56285621af72e761287c3d.jpg`;
    } else if (percentage > 30 && percentage <= 40) {
        return `https://cdn.discordapp.com/attachments/947608457903743066/1217550319966486638/b1e28e1134cd9ae4d872f16d6c717639.png?ex=66046f19&is=65f1fa19&hm=12b2685963071eac5a3af23f3730d7eecaf3828172d28a9f86a362a6a58e78b6&`;
    } else if (percentage > 40 && percentage <= 50) {
        return `https://i.pinimg.com/236x/9f/33/2f/9f332f7f80838d416695c7dad7f0e83c.jpg`;
    } else if (percentage > 50 && percentage <= 60) {
        return `https://i.pinimg.com/236x/d4/55/17/d45517d9d28e2b8ffd184e923c8067e9.jpg`;
    } else if (percentage > 60 && percentage <= 70) {
        return `https://i.pinimg.com/236x/f6/e9/72/f6e972ab451ca06bcb8333810d53d995.jpg`;
    } else if (percentage > 70 && percentage <= 80) {
        return `https://i.pinimg.com/236x/c8/13/44/c813443f84c6d70f8bcf5643947f03e1.jpg`;
    } else if (percentage > 80 && percentage <= 90) {
        return `https://i.pinimg.com/236x/aa/0b/c5/aa0bc5ff9104d6b1aa885e6b17b6aa30.jpg`;
    } else if (percentage > 90 && percentage <= 99){
        return `https://i.pinimg.com/236x/20/65/46/206546895b84f8f5df2118a177fbb744.jpg`;
    }else {
        return `https://i.pinimg.com/564x/68/cd/83/68cd83ef9ab32a019bd25579d4eccf38.jpg`; 
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