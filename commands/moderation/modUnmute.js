const discord = require("discord.js");
const ms = require("ms");
const botConfig = require("../../botconfig.json")
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegestaan dit te doen!**");

    let mutee = message.mentions.members.first();
    if (!mutee) return message.channel.send("Ik kon de gebruiker niet vonden");

    if (!warns[mutee.id]) warns[mutee.id] = {
        warns: 0,
        mutes: 0,
        kicks: 0,
        bans: 0
    };

    var muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase().includes("muted"));
    if (!muteRole) return message.channel.send("Ik kon de \"Muted\" rol niet vinden.");

    mutee.roles.remove(muteRole.id).then(() => {
    })

    let embed = new discord.MessageEmbed()
        .setDescription("LOG: Unmute")
        .setColor(botConfig.color)
        .addField("Gebruiker", mutee.user.username)
        .addField("Door", message.author.username)

    var logchannel = message.guild.channels.cache.find(c => c.name == botConfig.logChannel);
    if(logchannel) logchannel.send(embed);

    message.channel.send("Ik heb succesvol " + mutee.user.tag + " zijn mute verwijderd.")

}

module.exports.help = {
    name: "unmute",
    description: "Unmute een gebruiker."
}