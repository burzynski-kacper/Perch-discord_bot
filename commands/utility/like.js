const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, Image }= require('canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('like')
		.setDescription('Przyjaźń to najcenniejszy skarb, jaki można posiąść')
        .addUserOption(option =>
            option.setName('user1')
                .setDescription('Pierwszy użytkownik')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user2')
                .setDescription('Drugi użytkownik')
                .setRequired(true)),
    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        // Wygeneruj losowy poziom przyjaźni
        const randomPercentage = Math.floor(Math.random() * 101);
        
        // Canvas image
        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');

        ctx.fileStyle = 'red';
        const image = new Image();
        image.src = 'https://i.pinimg.com/736x/2a/ae/25/2aae25f7bcb3b8c22903c568dbbb4a57.jpg';

        // const avatar1 = new Image();
        // avatar1.src = user1.displayAvatarURL({ format: 'png', dynamic: true, size: 256 });

        // const avatar2 = new Image();
        // avatar2.src = user2.displayAvatarURL({ format: 'png', dynamic: true, size: 256 });

        image.onload = async function(){

            ctx.drawImage(image, 0, 0, 1920, 1080);

            ctx.fillStyle = 'white';
            ctx.font = '250px Sans';
            ctx.fillText(`${user1.username}`, 50, 420);
            ctx.fillStyle = 'red';
            ctx.fillText(`${randomPercentage}%`, 800, 720);
            ctx.fillStyle = 'white';
            ctx.fillText(`${user2.username}`, 1200, 1020);

            const buffer = canvas.toBuffer('image/png');
            const attachment = new AttachmentBuilder(buffer, {name: 'image.png'});
            
            const embed = new EmbedBuilder()
                .setTitle('Friendship level')
                .setColor('Green')
                .setImage('attachment://image.png');
    
            await interaction.reply({ embeds: [embed], files: [attachment] });
        };
    }
};