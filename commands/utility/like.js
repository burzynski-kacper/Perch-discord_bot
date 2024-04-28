const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage }= require('canvas');

function setDesc(value){
    if (value >= 0 && value <= 25) return "Nienawidzę cię!";
    else if (value > 25 && value <= 50) return "Ehh...";
    else if (value > 50 && value <= 75) return "Lubie cię :)";
    else return "**KOCHAM**";
}

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

        const randomPercentage = Math.floor(Math.random() * 101);
        
        // Canvas image
        const canvas = createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');

        // URLs of images
        const imageURL = 'https://i.pinimg.com/736x/2a/ae/25/2aae25f7bcb3b8c22903c568dbbb4a57.jpg';
        const heartURL = 'https://cdn.discordapp.com/attachments/1141002045021761656/1234158799762231427/heart.png?ex=662fb773&is=662e65f3&hm=10d147215c65d042186c1101c0eb51f45765d8d7169fd5e462009d91c89d6517&';
        const avatarURL1 = user1.displayAvatarURL({ extension: 'jpg' });
        const avatarURL2 = user2.displayAvatarURL({ extension: 'jpg' });

        // Load images asynchronously
        const [image, avatar1, avatar2, heart] = await Promise.all([
            loadImage(imageURL),
            loadImage(avatarURL1),
            loadImage(avatarURL2),
            loadImage(heartURL)
        ]);

        ctx.drawImage(image, 0, 0, 1920, 1080);

        const x1 = 400, x2 = 1550, x3 = 950, y = 750, r = 256;
        const img1X = x1 - 512 / 2, img1Y = y - 512 / 2;
        const img2X = x2 - 512 / 2;

        ctx.beginPath();
        ctx.arc(x1, y, r, 0, Math.PI * 2, true);
        ctx.arc(x2, y, r, 0, Math.PI * 2, true);
        ctx.arc(x3, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar1, img1X, img1Y, 512, 512);
        ctx.drawImage(avatar2, img2X, img1Y, 512, 512);
        ctx.drawImage(heart, 700, img1Y, 512, 512);

        ctx.font = '170px Sans';
        ctx.fillStyle = 'white';
        ctx.fillText(`${randomPercentage}%`, 780, 800);

        const buffer = canvas.toBuffer('image/png');
        const attachment = new AttachmentBuilder(buffer, {name: 'image.png'});
            
        const embed = new EmbedBuilder()
            .setTitle('Friendship level')
            .setDescription(setDesc(randomPercentage))
            .setColor('Green')
            .setImage('attachment://image.png');
    
        await interaction.reply({ embeds: [embed], files: [attachment] });

    }
};