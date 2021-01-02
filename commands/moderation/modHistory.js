const discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    var user = message.guild.member(message.mentions.users.first());
    if (!user) return message.channel.send("Kon de gebruiker niet vinden.");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0,
        mutes: 0,
        kicks: 0,
        bans: 0
    };
    let file = warns[user.id]

    let embed = new discord.MessageEmbed()
        .setTitle(`Geschiedenis ${user.user.tag}`)
        .setColor(botConfig.color)
        .addField("Waarschuwingen:", file.warns, true)
        .addField("Mutes:", file.mutes, true)
        .addField("Kicks:", file.kicks, true)
        .addField("Verbanningen:", file.bans, true);

        message.channel.send(embed)


}

module.exports.help = {
    name: "history",
    description: "Bekijk de geschiedenis van een gebruiker."
}