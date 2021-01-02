const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!*");

    var kickUser = message.guild.member(message.mentions.users.first());
    if (!kickUser) return message.channel.send("I couldn't find the specified user!");

    if (!warns[kickUser.id]) warns[kickUser.id] = {
        warns: 0,
        mutes: 0,
        kicks: 0,
        bans: 0
    };
    var reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send("Geen reden meegegeven!")

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!**");

    warns[kickUser.id].kicks++
    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var banEmbed2 = new discord.MessageEmbed()
        .setTitle(`U bent gekicked van ${message.guild.name}!`)
        .setColor(botConfig.color)
        .addField("Door:", message.author.tag)
        .addField("Reden:", reason);

    kickUser.send(banEmbed2).then(function () {
        message.guild.member(kickUser).kick(reason);
        return message.channel.send("De meegegeven gebruiker is succesvol gekicked en heeft succesvol een notificatie ontvangen!");
    }).catch(function () {
        message.guild.member(kickUser).kick(reason);
        return message.channel.send("De meegegeven gebruiker is succesvol gekicked, maar heeft geen notificatie ontvangen!");
    });

    let logChannel = message.guild.channels.cache.get(botConfig.logChannel);
    if (logChannel) {
        var banEmbed = new discord.MessageEmbed()
            .setTitle(`LOG: kick`)
            .setColor(botConfig.color)
            .addField("Gebruiker:", kickUser.user.tag)
            .addField("Door:", message.author.tag)
            .addField("Aantal kicks: ", warns[kickUser.id].kicks)
            .addField("Reden:", reason);

            logChannel.send(banEmbed)
    }

}

module.exports.help = {
    name: "kick"
}