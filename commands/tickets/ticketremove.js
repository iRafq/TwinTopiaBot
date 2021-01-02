const discord = require("discord.js");
const botConfig = require("../../botconfig.json")


module.exports.run = async (bot, message, args) => {

    const NoRole = new discord.MessageEmbed()
    .setTitle("Role Error!")
    .setThumbnail("https://cdn.discordapp.com/attachments/738368440208850984/738441809612505178/unknown.png")
    .setDescription("**Er bestaat geen `Support Team` role!**\nGebruik `-setup` om de bot te setuppen!")
    .setFooter("© bTickets")
    .setTimestamp()
    .setColor("#AA79CC")

    let cata = message.guild.channels.cache.find(c => c.name == botConfig.ticketcat && c.type == "category")   
    
    if(!message.member.roles.cache.find(r => r.name.includes(botConfig.ticketname))) return message.channel.send(":x: | U bent geen staffmember!");



    if (message.channel.parentID == cata.id) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`U kunt dit helaas niet doen vraag een medewerker om hulp`).then(msg => msg.delete({ timeout: 10000 }));
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Ik kon de gebruiker niet vinden")


        message.channel.updateOverwrite(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

        message.channel.send(`${user} was succesvol geremoved.`)

    } else return message.channel.send("Dit is geen ticket.").then(msg => msg.delete({ timeout: 10000 }));


}

    module.exports.help = {
        name: "remove",
}