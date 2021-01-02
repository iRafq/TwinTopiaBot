const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: **U bent niet toegestaan om dit te doen!**");
    var banUser = message.guild.member(message.mentions.users.first());
    if (!banUser) return message.channel.send("U hebt geen gebruiker meegegeven!");

    if (!warns[banUser.id]) warns[banUser.id] = {
        warns: 0,
        mutes: 0,
        kicks: 0,
        bans: 0
    };
    var reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send("U hebt geen reden meegegevn!")

    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: **U bent niet toegestaan om deze gebruiker te verbannen!**");

    warns[banUser.id].bans++
    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var banEmbed2 = new discord.MessageEmbed()
        .setTitle(`U bent verbannen van  ${message.guild.name}!`)
        .setColor(botConfig.color)
        .addField("Door:", message.author.tag)
        .addField("Reden:", reason);


    banUser.send(banEmbed2).then(function () {
        message.guild.member(banUser).ban(reason);
        return message.channel.send("De meegegeven gebruiker is succesvol verbannen en heeft succesvol een notificatie ontvangen!");
    }).catch(function () {
        message.guild.member(banUser).ban(reason);
        return message.channel.send("De meegeven gebruiker is succesvol verbannen, maar heeft geen notificatie ontvangen");
    });
    let logChannel = message.guild.channels.cache.get(botConfig.logChannel);
    if (logChannel) {
        var banEmbed = new discord.MessageEmbed()
            .setTitle(`LOG: Ban`)
            .setColor(botConfig.color)
            .addField("Gebruiker:", banUser.user.tag)
            .addField("Door:", message.author.tag)
            .addField("Aantal bans: ", warns[banUser.id].bans)
            .addField("Reden:", reason);

        logChannel.send(banEmbed)
    }
}

module.exports.help = {
    name: "ban",
    description: "Verban een gebruiker van de server."
}