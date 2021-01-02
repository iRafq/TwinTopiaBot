const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.channel.send(new discord.MessageEmbed().setTitle("Membercount").addField("Leden", `${message.guild.memberCount}`).setColor(botConfig.color).setFooter(botConfig.footer).setTimestamp().setThumbnail(botConfig.thumbnail));
}

module.exports.help = {
    name: "members",
    alias: ["leden", "membercount", "ledencount"]
}