const discord = require("discord.js");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {

    let cata = message.guild.channels.cache.find(c => c.name == botConfig.ticketcat && c.type == "category")    

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Je bent niet toegelaten om dit te doen.")
    if(!message.member.roles.cache.find(r => r.name.includes(botConfig.ticketname))) return message.channel.send(":x: | U bent geen staffmember!");

    if (message.channel.parentID == cata.id) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Ik kon de gebruiker niet vindenr")

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

        message.channel.send(`${user} was succesvol toegevoegd.`)

    } else return message.channel.send("Dit is geen ticket.")


}

module.exports.help = {
    name: "add"
}