const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegestaan dit te doen!**");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    if (!user) return message.channel.send("Ik kon de gebruiker niet vinden.");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("U bent niet toegestaan deze gebruiker te waarschuwen");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Ik kon geen reden vinden");

    if (!warns[user.id]) warns[user.id] = {
        warns: 0,
        mutes: 0,
        kicks: 0,
        bans: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.MessageEmbed()
        .setDescription("LOG: Warn")
        .setColor(botConfig.color)
        .addField("Gebruiker", user)
        .addField("Door", message.author)
        .addField("Antal waarschuwingen", warns[user.id].warns)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.cache.get(botConfig.logChannel)
    if (warnChannel) warnChannel.send(warnEmbed);

    message.channel.send(user.user.tag + " is succesvol gewaarschuwd voor: `" + reason + "`");

}

module.exports.help = {
    name: "warn",
    description: "Warschuw een gebruiker."
}