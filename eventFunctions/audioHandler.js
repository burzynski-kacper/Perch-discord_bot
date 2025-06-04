const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

async function playAudioInChannel(channel, audioPath) {
  try {
    // Tworzenie połączenia z kanałem głosowym
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    // Tworzenie playera audio i zasobu
    const player = createAudioPlayer();
    const resource = createAudioResource(audioPath);

    // Podłącz player do połączenia
    connection.subscribe(player);
    player.play(resource);

    console.log(`Odtwarzanie audio w kanale: ${channel.name}`);

    // Odłącz po zakończeniu odtwarzania
    player.on("idle", () => {
      connection.destroy();
      console.log("Bot opuścił kanał po zakończeniu odtwarzania.");
    });
  } catch (error) {
    console.error(`Błąd podczas odtwarzania audio: ${error.message}`);
  }
}

module.exports = { playAudioInChannel };
