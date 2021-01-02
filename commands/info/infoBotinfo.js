const Discord = module.require('discord.js');
const botConfig = require("../../botconfig")

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
        .setThumbnail(botConfig.thumbnail)
        .setTitle("Bot informatie")
        .setColor(botConfig.color)
        .addField("Naam", `${bot.user.tag}`, true)
        .addField("ID", bot.user.id, true)
        .addField("Nickname", `${message.guild.me.nickname ? `${message.guild.me.nickname}` : "Geen"}`, true)
        .addField("Account gemaakt op", bot.user.createdAt)
        .addField("Bot gemaakt door", "@</BamiSchijf>#9298")
        .setFooter(botConfig.footer + "• By bBots")
        .setTimestamp()
        .setTimestamp(Date.now())

    message.channel.send(embed);

}





module.exports.help = {
    name: 'botinfo',
    description: "Krijg info over de bot"
}