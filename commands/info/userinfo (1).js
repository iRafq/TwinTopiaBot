const Discord = require("discord.js");
const botConfig = require("../../botconfig")


module.exports.run =async (bot, message, args) => {
    let inline = true
    let resence = true
    const status = {
        online: "Online",
        idle: "Inactief",
        dnd: "Niet storen",
        offline: "Offline/Onzichtbaar"
      }
        
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (member.user.bot === true) {
    bot = "Ja";
  } else {
    bot = "Nee";
  }

            let embed = new  Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail(botConfig.thumbnail)
                .setColor(botConfig.color)
                .addField("Naam", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Bijnaam", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "Geen"}`, true)
                .addField("Bot", `${bot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Speelt niks"}`,inline, true)
                .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Geen Roles"}`, true)
                .addField("Is de discord gejoined op", member.user.createdAt)
                .setFooter(`Information over ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            
    }

    module.exports.help = {
        name: "userinfo"
    }