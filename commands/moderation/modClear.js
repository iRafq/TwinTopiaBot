const discord = require("discord.js");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {

    //!clear 15

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!**");

    if (!args[0]) return message.channel.send("Geef het aantal van berichten dat u wilt verwijderen.");
    if (isNaN(args[0])) return message.channel.send("Geef een correct aantal!")
    if (args[0] > 100) return message.channel.send("Ik kan niet meer dan 100 berichten tegelijk verwijderen.");
    if (args[0] < 1) return message.channel.send("Ik kan niet minder dan 1 bericht verwijderen.");

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} berichten verwijderd.`).then(msg => setTimeout(() => {
            msg.delete()
        }, 5000));

        var clearEmbed = new discord.MessageEmbed()
            .setDescription("LOG: Clear")
            .setColor(botConfig.color)
            .addField("Kanaal", message.channel)
            .addField("Door", message.author)
            .addField("Aantal berichten", args[0])
            .setTimestamp();

        var clearChannel = message.guild.channels.cache.get(botConfig.logChannel);
        if (!clearChannel) clearChannel.send(clearEmbed);
    });




}
module.exports.help = {
    name: "clear",
    description: "Verwijder een aantal berichten tussen 1 een 100",
}