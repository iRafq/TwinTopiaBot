const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig.json")

module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    var user = message.guild.member(message.mentions.users.first());

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!**");

    if (!user) return message.channel.send("Ik de gebruiker niet vinden.");

    if (!warns[user.id]) return message.channel.send("Deze gebruiker heeft nog geen waarschuwingen ontvangen")

    if (warns[user.id].warns == 0) return message.channel.send("Deze gebruiker heeft geen waarschuwingen.")

    warns[user.id].warns--;



    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var unwarnEmbed = new discord.MessageEmbed()
        .setDescription("LOG: Uwarn")
        .setColor(botConfig.color)
        .addField("Gebruiker", user)
        .addField("Door", message.author)
        .addField("Waarschuwingen", warns[user.id].warns)

    var warnChannel = message.guild.channels.cache.get(botConfig.logChannel);
    if (warnChannel) warnChannel.send(unwarnEmbed);
    message.channel.send(user.user.tag + " zijn waarschuwing is succesvol verwijderd.");


}
module.exports.help = {
    name: "unwarn",
    description: "Verwijder de waarschuwing van een gebruiker"
}