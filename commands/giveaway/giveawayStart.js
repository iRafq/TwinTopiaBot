const Discord = require("discord.js");
const ms = require("ms"); // npm install ms
const botConfig = require("../../botconfig")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: **U bent niet toegestaan dit te doen!**");
    if (args[2]) {
        message.delete().catch(err => { });
        const item = args.slice(2).join(" ");
        const winnersCount = args[0];
        const time = args[1];


        bot.giveawaysManager.start(message.channel, {
            time: ms(time),
            prize: item,
            winnerCount: parseInt(winnersCount),
            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉 **GIVEAWAY BEËINDIGD** 🎉🎉",
                timeRemaining: "Resterende tijd: **{duration}**!",
                inviteToParticipate: "Reageer met 🎉 om mee te doen!",
                winMessage: "Gefeliciteerd, {winners}! U wint **{prize}** !",
                embedFooter: "Giveaway!",
                embedColor: botConfig.color,
                noWinner: "Giveaway geannuleerd, niet genoeg deelnemers.",
                winners: "winnaar(s)",
                endedAt: "Beëindid op",
                units: {
                    seconds: "seconden",
                    minutes: "minuten",
                    hours: "uren",
                    days: "dagen",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }

        }).then((gData) => {

        });
    } else {
        message.reply("Gebruik het commando als volgt:`!giveaway aantal-mogelijke-winnaars Tijd Prijs");
    }
}

module.exports.help = {
    name: "giveaway",
    description: "Start een nieuwe giveaway"
}