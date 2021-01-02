module.exports.help = {
    name: "forceclose",
    description: "ForceClose een ticket!"
}
const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

// Vul voor e3 het aantal seconden in :p
let time = 10e3;
module.exports.run = async (bot, message, args) => {

    if(!message.channel.parent) return message.channel.send("Dit is geen ticket!")
    if(message.channel.parent.name != botConfig.ticketcat) return message.channel.send("Dit is geen ticket!")
    // Role controleren
    if(!message.member.roles.cache.find(r => r.name.includes(botConfig.ticketname))) return message.channel.send(":x: | U bent geen staffmember!");



    // Kanaal sluiten
    message.channel.delete()
}