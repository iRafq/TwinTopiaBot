const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

 
module.exports.run = async (bot, message, args) => {
 
    // Vang het idee op.
    var idee = args.join(" ");
 
    // Kijk na als er een idee is meegegeven.
    if (!idee) return message.channel.send("Geen Idee meegegeven, gelieve een idee mee te geven.");
 
    // Maak het embed aan.
    var ideeEmbed = new discord.MessageEmbed()
        .setTitle("Nieuw Voorstel")
        .setThumbnail(botConfig.thumbnail)
        .setColor(botConfig.color)
        .addField("Idee: ", idee)
        .setFooter(botConfig.footer)
        .setTimestamp()
        .addField("Ingezonden door: ", message.author);
 
    message.delete()
    message.channel.send(":white_check_mark: | Je hebt succesvol een idee geschreven!");
    // Vind het kanaal.
    let ideeChannel = message.guild.channels.cache.get("738730862945894400")
    if (!ideeChannel) return message.guild.send("Kan het kanaal niet vinden");
 
    // Verzend het bericht en voeg er reacties aan toe.
    ideeChannel.send(ideeEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });
 
    // Einde.
 
}
 
module.exports.help = {
    name: "suggestie",
    description: "Heb je een voorstel. Zet het dan hier en misschien passen we het toe."
}