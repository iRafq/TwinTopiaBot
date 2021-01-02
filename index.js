const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); const client = new discord.Client();
const Discord = require("discord.js");

const fs = require("fs");
bot.commands = new discord.Collection();
const talkedRecently = new Map();
const botConfig = require("./botconfig.json")


// Requires Manager from discord-giveaways
const { GiveawaysManager } = require("discord-giveaways");
// Starts updating currents giveaways
const manager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: botConfig.color,
        reaction: "??"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
bot.giveawaysManager = manager;





//COMMAND HANDLER
fs.readdir("commands/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("Er zijn geen commando's gevonden!");
        return;
    }
    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is nu geladen.`);
        bot.commands.set(fileGet.help.name, fileGet);

    })

});



//COMMAND HANDLER
fs.readdir("commands/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("Er zijn geen commando's gevonden!");
        return;
    }
    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is nu geladen.`);
        bot.commands.set(fileGet.help.name, fileGet);

    })

});




const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
//Test
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;

        let props = require(`./events/${file}`);

        let eventName = file.split(".")[0];
        console.log(`Loading the event ${eventName}...`);

        bot.on(eventName, props.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

const stuff = ['moderation', 'giveaway', 'info', 'fun', 'overig', 'tickets'];
stuff.forEach(c => {
    readdir(`./commands/${c}/`, (err, files) => {
        if (err) throw err;
        console.log(`Loading a total of ${files.length} commands (${c})`);
        files.forEach(f => {
            if (!f.endsWith(".js")) return;
            let props = require(`./commands/${c}/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
});



//test

bot.on("ready", async member => {
    console.log(`${bot.user.username} Is online en klaar voor gebruik!`);


    setInterval(function () {

        let statut = ["WATCHING"];
        let rndmStatut = statut[Math.floor(Math.random() * statut.length)];

        let statuttext = ['TwinTopia', '!help', 'IP --> SOON'];
        const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
        bot.user.setActivity(randomText, { type: rndmStatut });
    }, 20000)
});







//
//
// tickets help msg en betaling!!!
//
//

bot.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = "!"
    if (!message.content.startsWith(prefix)) return;
    var messageArray = message.content.split(" ");
    var command = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));
    if (commands) commands.run(bot, message, args);

    if (message.content.toLowerCase().startsWith("!help")) {
        var avatar = message.author.displayAvatarURL()
        var embedMessage = new Discord.MessageEmbed()
            .setColor(botConfig.color)
            .setTitle(":information_source: | Command Help")
            .setDescription("Wij hebben de commands opgedeeld in categorieën:\n\n:paperclip: | Basic Commands\n:tickets: | Tickets\n::tickets: | Moderatie\n:lock_with_ink_pen: | Staff Tickets\n:closed_lock_with_key: | Staff Commands\n:bulb: | Info commands")
            .setFooter("Voor " + message.author.tag + ". • Command Help", avatar)
        sentMessage = await message.channel.send(embedMessage)
        sentMessage.react(":paperclip:")
        sentMessage.react(":tickets:")
        sentMessage.react(":tickets:")
        sentMessage.react(":lock_with_ink_pen:")
        sentMessage.react(":closed_lock_with_key:")
        sentMessage.react(":bulb:")
    }
    // !reactionticket
    if (message.content.toLowerCase().startsWith("!reactionticket")) {
        if (message.member.roles.cache.has(botConfig.ticketRole)) {
            message.delete()
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":tickets: Ticket Openen")
                .setThumbnail(botConfig.thumbnail)
                .setDescription("Reageer om een ticket te openen!\n\n:clipboard: | Sollicitatie\n:moneybag: | Aankopen\n:question: | Vragen\n:pray: | Partners\n:paperclip: | Overig")
                .setFooter(botConfig.footer + " • Ticket Openen")
            message.channel.send(embedMessage).then(message => {
                sentMessage.react(":paperclip:")
                sentMessage.react(":tickets:")
                sentMessage.react(":tickets:")
                sentMessage.react(":lock_with_ink_pen:")
                sentMessage.react(":closed_lock_with_key:")
                sentMessage.react(":bulb:")
            })
        }
    }

    // !betaling
    if (message.content.toLowerCase().startsWith("!betaling")) {
        if (message.member.roles.cache.has("716636229999001611")) {
            message.delete()
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle("Betaling")
                .setDescription("U kunt betalen voor uw spullen op 2 manieren. Via Tikkie en via PayPal. Reageer met een <:tikkie:739573914199392289> om via Tikkie te betalen en met een <:paypal:739573932751061012> om via PayPal te betalen.")
                .setFooter("Betaling • ReplayNetwork")
            sentMessage = await message.channel.send(embedMessage)
            sentMessage.react("739573932751061012")
            sentMessage.react("739573914199392289")
        }
    }


});

bot.on("messageReactionAdd", async (reaction, member) => {
    if (member.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.message.channel.partial) await reaction.message.channel.fetch()
    if (!reaction.message.embeds[0]) return
    if (reaction.message.embeds[0].title == "Betaling") {
        if (reaction.emoji.id == "739573914199392289") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle("<:tikkie:739573914199392289> Betaling via Tikkie")
                .setDescription("U kunt betalen voor uw spullen via Tikkie.\nDit kan via de volgende link: https://tikkie.me/pay/46varqu0hjetphpbqfen\n!(Deze link is geldig t/m 15 augustus)!\n\nGeef duidelijk aan voor wat u betaald! (Zet dit in de bijlage!)")
                .setFooter("Betaling • " + botConfig.footer)
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.id == "739573932751061012") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle("<:paypal:739573932751061012> Betaling via PayPal")
                .setDescription("U kunt betalen voor uw spullen via PayPal.\nOm te betalen via Paypal, ga naar de store! Hier is een betaalmethode `paypal`!")
                .setFooter("Betaling •" + botConfig.footer)
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
    }
    if (reaction.message.embeds[0].title == ":tickets: Ticket Openen") {
        if (reaction.emoji.name == "??") {
            openTicketReaction(member, "aankopen", reaction)
        }
        if (reaction.emoji.name == "??") {
            openTicketReaction(member, "sollicitatie", reaction)
        }
        if (reaction.emoji.name == "?") {
            openTicketReaction(member, "vraag", reaction)
        }
        if (reaction.emoji.name == "??") {
            openTicketReaction(member, "partner", reaction)
        }
        if (reaction.emoji.name == "??") {
            openTicketReaction(member, "overig", reaction)
        }

    }
    if (reaction.message.embeds[0].title == ":information_source: | Command Help") {
        if (reaction.emoji.name == "??") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":information_source: Command Help - Basic Commands")
                .setDescription("Dit zijn basic commands.\n\n`!help`\nHet help command.\n`!suggestie`\nLaat een suggestie achter.\n`!8ball`\nVraag iets aan de bot.\n`!sps`\nSpeel steen, papier, schaar tegen de bot.\n`!meme`\nKrijg een meme van de bot.")
                .setFooter("Voor " + member.tag + ". • Command Help - Basic Commands")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "???") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":information_source: Command Help - Tickets")
                .setDescription("Dit zijn ticket commands.\n\n`!ticket`\nMaak een ticket aan.\n`!close`\nSluit een ticket.\n`!rename`\nHernoem een ticket.\n`!add`\nVoeg iemand toe aan de ticket.")
                .setFooter("Voor " + member.tag + ". • Command Help - Tickets")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "??") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":information_source: Command Help - Moderatie")
                .setDescription("Dit zijn moderatie commands.\n\n`!history`\nBekijk iemands geschiedenis.\n`!warn`\nWaarschuw iemand.\n`!mute`\nMute iemand.\n`!kick`\nKick iemand.\n`!ban`\nBan iemand.")
                .setFooter("Voor " + member.tag + ". • Command Help - Moderatie")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "??") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":information_source: Command Help - Staff Tickets")
                .setDescription("Dit zijn staff tickets commands.\n\n`!close`\nSluit een ticket.\n`!rename`\nHernoem de ticket.\n`!add`\nVoeg een gebruiker toe.\n`!forceclose`\nSluit een ticket meteen.\n`!remove`\nVerwijder iemand uit de ticket")
                .setFooter("Voor " + member.tag + ". • Command Help - Staff Tickets")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "??") {
            var embedMessage = new Discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":information_source: Command Help - Staff Commands")
                .setDescription("Dit zijn staff commands.\n\n`!ban`\nOm mensen te bannen.\n`!announcement`\nMaak een mededeling bericht.\n`!say`\nZeg iets met de bot.\n`!warn`\nWarn een stout iemand!\n`!kick`\nKick mensen die zich niet gedragen.\n`!clear`\nVerwijder een aantal berichten in een kanaal.")
                .setFooter("Voor " + member.tag + ". • Command Help - Staff Commands")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "??") {
            var embedMessage = new discord.MessageEmbed()
                .setColor(botConfig.color)
                .setTitle(":bulb: Command Help - Info Commands")
                .setDescription("Dit zijn info commands.\n\n`!serverinfo`\nBekijk de server info.\n`!botinfo`\nBekijk de bot info.\n`!userinfo`\nBekijk je eigen info.\n!website`\nBekijk de website.")
                .setFooter("Voor " + member.tag + ". • Command Help - Info Commands")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
    }

})

function openTicketReaction(member, topic, reaction) {
    reaction.users.remove(member.id)
    reaction.message.guild.channels.create(topic + "-" + member.username, {
        type: 'text',
        parent: reaction.message.guild.channels.cache.find(c => c.name == botConfig.ticketcat).id,
        permissionOverwrites: [{
            id: member.id,
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: reaction.message.member.guild.roles.cache.find(r => r.name == botConfig.ticketname).id,
            allow: ['VIEW_CHANNEL'],
        },
        {
            id: reaction.message.member.guild.id,
            deny: ['VIEW_CHANNEL'],
        }
        ]
    }).catch().then(ticket_channel => {
        var embedMessage = new Discord.MessageEmbed()
            .setColor(botConfig.color)
            .setDescription("Ik heb je ticket aangemaakt!! <#" + ticket_channel.id + ">")
        reaction.message.channel.send(embedMessage).then(message => {
            setTimeout(function () {
                message.delete()
            }, 5000)
        })

        var botAvatar = bot.user.displayAvatarURL()
        var avatar = member.displayAvatarURL()
        var embedMessage = new Discord.MessageEmbed()
            .setColor(botConfig.color)
            .setTitle("**Ticket**")
            .setDescription("Je hebt een ticket aangemaakt!\nU word zo snel mogelijk geholpen door onze staff leden!")
            .setFooter("Ticket van " + member.tag + ". • " + botConfig.footer, avatar)
        ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find(r => r.name == botConfig.ticketname).id}>.`)
        ticket_channel.send(embedMessage)
    }).catch()
}

bot.on("guildMemberAdd", async member => {


    const WelkomEmbed = new discord.MessageEmbed()
        .setAuthor(`Welkom ${member.user.username}!`)
        .setDescription(`Welkom in de **TwinTopia** Discord server. Veel speel plezier op **SOON**!`)
        .setColor(botConfig.color)
        .setThumbnail(member.user.avatarURL({
            dynamic: true
        }) ? member.user.avatarURL({
            dynamic: true
        }) : null)
        .setTimestamp()
        .setFooter(botConfig.footer)
    var WelkomChannel = member.guild.channels.cache.find(channel => channel.name === "????welkom");
    WelkomChannel.send(WelkomEmbed)
});



bot.login(process.env.token);