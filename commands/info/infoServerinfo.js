const discord = require("discord.js");
const botConfig = require("../../botconfig")

module.exports.run = async (bot, message, args) => {

    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " dag" : " dagen") + " geleden";
    };

    const embed = new discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("Naam", message.guild.name, true)
        .setColor(botConfig.color)
        .addField("ID", message.guild.id, true)
        .addField("Eigenaar", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Leden", `${message.guild.members.cache.size}`, true)
        .addField("Kanalen", message.guild.channels.cache.size, true)
        .addField("Rollen", message.guild.roles.cache.size, true)
        .setFooter(botConfig.footer)
        .setTimestamp()
        .addField("Datum aangemaakt", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(botConfig.thumbnail)
    message.channel.send({embed});
}

module.exports.help = {
    name: "serverinfo",
    description: "Krijg de server info"
}