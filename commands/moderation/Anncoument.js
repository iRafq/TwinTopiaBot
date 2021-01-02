const discord = require("discord.js");
const fs = require("fs");
const botConfig = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));
module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij kan dit niet doen.");

    let beschrijving = args.join(' ')
    if(!beschrijving) return message.channel.send("Geef een announcement mee.")

    let embed = new discord.MessageEmbed()
    .setTitle("Announcement")
    .setDescription(beschrijving)
    .setFooter(`Door ${message.author.tag}`);

    message.channel.send(embed)
}
module.exports.help = {
    name: "announcement",
    description: "Stuur een announcement met de bot",
}