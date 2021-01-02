const botConfig = require("../../botconfig.json")

module.exports.help = {
    name: "close",
    description: "Sluit een ticket!",
    alias: ["sluiten", "sluit"]
}
// Vul voor e3 het aantal seconden in :p
let time = 10e3;
module.exports.run = async (bot, message, args) => {
    if(!message.channel.parent) return message.channel.send("Dit is geen ticket!")
    if(message.channel.parent.name != botConfig.ticketcat) return message.channel.send("Dit is geen ticket!")
    // Role controleren
        if(!message.member.roles.cache.find(r => r.name.includes(botConfig.ticketname))) return message.channel.send(":x: | U bent geen staffmember!");



    // Kanaal sluiten
    let msg = await message.channel.send(`Ik sluit de ticket over **${time/1e3}** seconden. Typ **annuleer** om deze actie ongedaan te maken.`);
    let collector = msg.channel.createMessageCollector(m => m.content.toLowerCase().includes("annuleer"), { time: time, max: 1 })
    collector.on("end", collected => {
        if(collected.size < 1) return msg.channel.delete();
        msg.channel.send("Ik ben gestopt.")
    })
}