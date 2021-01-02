const { MessageEmbed } = require('discord.js');
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!**");


    message.delete()
    const embed = new MessageEmbed()
        .setColor(botConfig.color)
        .setThumbnail(botConfig.thumbnail)
        .setDescription(args.join(" "))
        .setFooter(botConfig.footer)
        .setTimestamp()
    message.channel.send({ embed })
}



module.exports.help = {
    name: "say"
}