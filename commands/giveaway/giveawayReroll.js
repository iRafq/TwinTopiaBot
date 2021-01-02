const Discord = require("discord.js");
const ms = require("ms"); // npm install ms
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: **U bent niet toegelaten dit te doen!**");

    if(!args[0]) return message.channel.send("Ik kon het messageID niet vinden!")
    let messageID = args[0];
    bot.giveawaysManager.reroll(messageID, {
        messages: {
            congrat: ":tada: Nieuwe winnaar(s) : {winners}! Gefeliciteerd!",
            error: "Niet genoeg deelnemers, ik win!"
        }
    }).then(() => {
        
        message.channel.send("Ik heb succesvol de giveaway reroll voltooid!");
    }).catch((err) => {
        message.channel.send("Ik kan de giveaway niet vinden voor " + messageID + "!");
    });

}

module.exports.help = {
    name: "reroll",
    description: "reroll een giveaway",
    cata: "staff"
}