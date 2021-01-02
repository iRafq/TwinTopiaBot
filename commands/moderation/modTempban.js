const discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    try {


        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U bent niet toegelaten dit te doen**");

        var user = message.guild.member(message.mentions.users.first());
        if (!user) return message.channel.send("Ik kon de gebruiker niet vinden!");

        if (!warns[user.id]) warns[user.id] = {
            warns: 0,
            mutes: 0,
            kicks: 0,
            bans: 0
        };

        if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("U bent niet toegelaten om deze gebruiker te muten.");

        var banTime = args[1];

        if (!banTime) return message.channel.send("U heeft geen tijd meegegeven.")

        var beginReason = banTime.length + args[0].length + 1;

        var reason = args.join(" ").slice(beginReason);
        if (!reason) return message.channel.send("U heeft geen reden meegegeven.")


        warns[user.id].bans++
        fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        var tempmute = new discord.MessageEmbed()
            .setDescription("LOG: Tempban")
            .setColor(botConfig.color)
            .addField("Gebruiker", `${user}, ${user.id}`)
            .addField("Door", `<@${message.author.id}>, ${message.author.id}`)
            .addField("Tijd", banTime)
            .addField("Aantal verbanningen: ", warns[user.id].bans)
            .addField("Reden", reason)
            .setTimestamp();

        var tempmuteChannel = message.guild.channels.cache.find(c => c.name == botConfig.logChannel);

        var banEmbed2 = new discord.MessageEmbed()
            .setTitle(`U bent tijdelijk verbannen van ${message.guild.name}!`)
            .setColor(botConfig.color)
            .addField("Door:", message.author.tag)
            .addField("Tijd:", banTime)
            .addField("Reden:", reason);


        user.send(banEmbed2).then(function () {
            message.guild.member(user).ban(reason);
        }).catch(function () {
            message.guild.member(user).ban(reason);
        });


        if (tempmuteChannel) tempmuteChannel.send(tempmute);
        message.channel.send(`${user} is verbannen voor ${banTime}.`);

        setTimeout(function () {

            message.guild.members.unban(user.id)


        }, ms(banTime));

    } catch (error) {
        console.log(error)
        return message.channel.send("Sorry, er is iets fout gegaan");
    }

    return;
}

module.exports.help = {
    name: "tempban",
    description: "Verban een gebruiker voor een bepaalde tijd."
}