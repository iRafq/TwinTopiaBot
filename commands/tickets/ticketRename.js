const discord = require("discord.js");
const botConfig = require("../../botconfig.json")

module.exports.run = async (bot, message, args, ops) => {

    let ticketRole = botConfig.ticketRole;
    let cata = message.guild.channels.cache.find(c => c.name == botConfig.ticketcat && c.type == "category")

    if(!message.member.roles.cache.find(r => r.name.includes(botConfig.ticketname))) return message.channel.send(":x: | U bent geen staffmember!");


    if (!message.member.roles.cache.has(ticketRole)) return message.channel.send(":x: **U bent niet toegestaan dit te doen!**")
    if (message.channel.parentID == cata.id) {
        if (!args[0]) return message.channel.send("U hebt geen nieuws ticketnaam meegegeven")
        message.channel.setName(args.join(' ')).then(ch => {
            message.channel.send(`Kanaalnaam is veranderd naar ${ch.name}`)

        })
    } else return message.channel.send("U kan dit alleen maar in een ticket doen")


}

module.exports.help = {
    name: "rename",
    description: "Verander de naam van een ticket!"
}