const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const { riotApi } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('league')
		.setDescription('Provides information about LOL account.')
        .addStringOption(option =>
			option.setName('summoner')
				.setDescription('The name of the summoner')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('The tag of the summoner')
                .setRequired(true)),

	async execute(interaction) {
        const summonerName = interaction.options.getString('summoner');
        const tagLine = interaction.options.getString('tag');

        try {
			// Collecting summoner data by riot id
			const summonerResponse = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`, {
				headers: {
					'X-Riot-Token': riotApi
				}
			});
			const summonerPuuid = summonerResponse.data.puuid;
            console.log("Collecting PUUID - Pass");
            // console.log("PUUID: ", summonerPuuid);

			// Collecting userId by puuid
			const userIdResponse = await axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summonerPuuid}`, {
				headers: {
					'X-Riot-Token': riotApi
				}
			});

            const userId = userIdResponse.data.id;
            console.log("Collecting userID - Pass");
            // console.log("UID: ", userId);

            // Collecting rank data by userId
			const rankData = await axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}`, {
				headers: {
					'X-Riot-Token': riotApi
				}
			});
            console.log("Collecting rank data - Pass");
            // console.log("Rank data: ", rankData);

			// Sprawdzenie, czy użytkownik ma rangę w solo/duo lub flex
			const soloDuoRank = rankData.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
			const flexRank = rankData.data.find(entry => entry.queueType === 'RANKED_FLEX_SR');
            let rankSoloDuo, rankFlex;
            let isSoloDuoUnranked, isFlexUnranked = false;

			if (soloDuoRank) {
				rankSoloDuo = `${soloDuoRank.tier} ${soloDuoRank.rank} (${soloDuoRank.leaguePoints} LP)`;
			} else {
				rankSoloDuo = "UNRANKED";
                isSoloDuoUnranked = true;
			}

			if (flexRank) {
				rankFlex = `${flexRank.tier} ${flexRank.rank} (${flexRank.leaguePoints} LP)`;
			} else {
				rankFlex = "UNRANKED";
                isFlexUnranked = true;
			}

            const rankHierarchy = {
                "UNRANKED": 0,
                "IRON": 1,
                "BRONZE": 2,
                "SILVER": 3,
                "GOLD": 4,
                "PLATINUM": 5,
                "DIAMOND": 6,
                "MASTER": 7,
                "GRANDMASTER": 8,
                "CHALLENGER": 9
            };
            const rankDetails = {
                "UNRANKED": {  color: 0xD3D3D3, imagePath: "./images/lol-ranks/Rank=Unranked.png" },
                "IRON": { color: 0xD4AF37, imagePath: "./images/lol-ranks/Rank=Iron.png" },
                "BRONZE": { color: 0xcd7f32, imagePath: "./images/lol-ranks/Rank=Bronze.png" },
                "SILVER": { color: 0xC0C0C0, imagePath: "./images/lol-ranks/Rank=Silver.png" },
                "GOLD": { color: 0xFFD700, imagePath: "./images/lol-ranks/Rank=Gold.png" },
                "PLATINUM": { color: 0x0088FF, imagePath: "./images/lol-ranks/Rank=Platinum.png" },
                "EMERALD": { color: 0x00d062, imagePath: "./images/lol-ranks/Rank=Emerald.png" },
                "DIAMOND": { color: 0x00BFFF, imagePath: "./images/lol-ranks/Rank=Diamond.png" },
                "MASTER": { color: 0x8A2BE2, imagePath: "./images/lol-ranks/Rank=Master.png" },
                "GRANDMASTER": { color: 0xFF1493, imagePath: "./images/lol-ranks/Rank=Grandmaster.png" },
                "CHALLENGER": { color: 0xFF6347, imagePath: "./images/lol-ranks/Rank=Challenger.png" }
            };

            let highestRank, soloDuoEmbedValue, flexEmbedValue, winRatePercentageSolo, winRatePercentageFlex;

            if (isSoloDuoUnranked && isFlexUnranked){
                highestRank = "UNRANKED";
                soloDuoEmbedValue = "Get a rank noob!";
                flexEmbedValue = "Get a rank noob!";
            }
            else if (isSoloDuoUnranked){ 
                highestRank = rankFlex.split(" ")[0];
                winRatePercentageFlex = flexRank.wins/(flexRank.wins+flexRank.losses)*100;
                flexEmbedValue = rankFlex+"\n"+flexRank.wins+"/"+flexRank.losses+" ("+winRatePercentageFlex.toFixed(1)+"%)";
                soloDuoEmbedValue = "Get a rank noob!";
            } else if (isFlexUnranked){
                highestRank = rankSoloDuo.split(" ")[0];
                winRatePercentageSolo = soloDuoRank.wins/(soloDuoRank.wins+soloDuoRank.losses)*100;
                soloDuoEmbedValue = rankSoloDuo+"\n"+soloDuoRank.wins+"/"+soloDuoRank.losses+" ("+winRatePercentageSolo.toFixed(1)+"%)";
                flexEmbedValue = "Get a rank noob!";
            } else {
                highestRank = rankHierarchy[soloDuoRank.tier] > rankHierarchy[flexRank.tier] ? soloDuoRank.tier : flexRank.tier;
                winRatePercentageFlex = flexRank.wins/(flexRank.wins+flexRank.losses)*100;
                winRatePercentageSolo = soloDuoRank.wins/(soloDuoRank.wins+soloDuoRank.losses)*100;
                soloDuoEmbedValue = rankSoloDuo+"\n"+soloDuoRank.wins+"/"+soloDuoRank.losses+" ("+winRatePercentageSolo.toFixed(1)+"%)";
                flexEmbedValue = rankFlex+"\n"+flexRank.wins+"/"+flexRank.losses+" ("+winRatePercentageFlex.toFixed(1)+"%)";
            }

            const rankInfo = rankDetails[highestRank];
            const attachment = new AttachmentBuilder(rankInfo.imagePath)
                .setName('image.png');

            const embed = new EmbedBuilder()
                .setColor(rankInfo.color)
                .setTitle(`Ranga gracza: ${summonerName}`)
                .addFields(
                    {
                        name: "Solo/Duo",
                        value: soloDuoEmbedValue,
                        inline: true
                    },
                    {
                        name: "Flex",
                        value: flexEmbedValue,
                        inline: true
                    }
                )
                .setImage('attachment://image.png');

			await interaction.reply({ embeds: [embed], files: [attachment] });
		} catch (error) {
			console.error('Błąd podczas pobierania danych:', error.response?.data || error.message);
			await interaction.reply('Nie udało się pobrać informacji o tym Summonerze. Sprawdź, czy nazwa jest poprawna.');
		}
	},
};