const discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {
    if (!args[1]) return message.channel.send("Misschien moet je een __**vraag**__ stellen? 😆 ");
    var antwoorden = ["**Antwoord:** Jazeker!", "**Antwoord:** Nee, sorry.", "**Antwoord:** Geen flauw idee! 😆", "**Antwoord:**  Zo slim ben ik ook weer niet..", "Mijn bronnen zeggen van niet!", "Ik weet het niet ;("];
    var resultaat = Math.floor((Math.random() * antwoorden.length));

    message.channel.send(antwoorden[resultaat]);

}

module.exports.help = {
    name: "8ball",
    description: "Stel de bot een ja of nee vraag!"
}