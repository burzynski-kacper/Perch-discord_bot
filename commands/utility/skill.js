const { SlashCommandBuilder } = require('discord.js');

function getImageUrl(percentage) {
    if (percentage >= 0 && percentage <= 10) {
        return `https://demotywatory.pl/uploads/202204/1649346791_qehtek_fb_plus.jpg`;
    } else if (percentage > 10 && percentage <= 20) {
        return `https://e-fortnite.pl/images/skiny/big/cid_038_athena_commando_m_disco.webp`;
    } else if (percentage > 20 && percentage <= 30) {
        return `https://i.pinimg.com/236x/a6/af/78/a6af787875cc96181305c157db06e0c1.jpg`;
    } else if (percentage > 30 && percentage <= 40) {
        return `https://i.pinimg.com/736x/dc/c1/4c/dcc14c538d855777567e55630c883baf.jpg`;
    } else if (percentage > 40 && percentage <= 50) {
        return `https://i.pinimg.com/474x/e1/cf/e9/e1cfe95b92fc42869c457ce6b17c3154.jpg`;
    } else if (percentage > 50 && percentage <= 60) {
        return `https://i.pinimg.com/736x/09/81/fb/0981fb3914d0019a6834f22bea07145c.jpg`;
    } else if (percentage > 60 && percentage <= 70) {
        return `https://pbs.twimg.com/media/E6KJRXoXIAAA4iQ.jpg`;
    } else if (percentage > 70 && percentage <= 80) {
        return `https://i.imgflip.com/8qlbk3.jpg`;
    } else if (percentage > 80 && percentage <= 90) {
        return `https://i.pinimg.com/736x/56/d5/ca/56d5ca92d1ccf9fc545738970535b939.jpg`;
    } else if (percentage > 90 && percentage <= 99){
        return `https://i.pinimg.com/736x/25/25/96/2525960c71a227a73391d87acf008099.jpg`;
    }else {
        return `https://static.posters.cz/image/750/tupac-finger-i81752.jpg`; 
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