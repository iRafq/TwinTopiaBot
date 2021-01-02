const discord = require("discord.js")
const botConfig = require("../../botconfig.json")

module.exports.run = async (bot, message, args) => {

    const TicketEmbed = new discord.MessageEmbed()
        .setTitle("Ticket")
        .setDescription("Maak een ticket in Ticket channel!")
        .setColor(botConfig.color)
        .setFooter("Ticket • " + botConfig.footer)


    message.channel.send(TicketEmbed)
}

module.exports.help = {
    name: "ticket",
    description: "Maak een ticket!",
    alias: ["new", "create"]
}