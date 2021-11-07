const Discord = require('discord.js');
module.exports = {
    name: 'add-emoji',
    aliases: ["Aucun"],
    category: 'Modération',
    formation: 'addemoji <emoji>',
    utilisation: 'Ajoute un émoji au serveur',
    permissions: 'ADMINISTRATOR',

    async execute(client, message, args) {
        if (!message.member.permissions.has(`MANAGE_EMOJIS`)) return message.channel.send('Vous n\'avez pas la permission: `MANAGE_EMOJIS`')
        try {
            function extractEmoji(emoji) {
                if (!emoji) {
                    return null;
                }

                let match = emoji.match(/<:.+:(\d{17,19})>/);
                if (!match || match.length > 18) { match = emoji.match(/<a:.+:(\d{17,19})>/); }
                return match ? match[1] : emoji;
            }
            if (!args[0]) {
                return message.channel.send('Veuillez fournir un émoji .')
            }
            const URL = `https://cdn.discordapp.com/emojis/${extractEmoji(message.content)}`
            const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
            let urlExtra = `https://cdn.discordapp.com/emojis/${extractEmoji(message.content)}`
            if (!URL) {
                return message.channel.send('Veuillez fournir un émoji.')
            }

            if (!name) {
                return message.channel.send("Nom manquant");
            }
            if (name.length < 2 || name > 32) {
                return message.channel.send("Nom invalide.");
            }

            message.guild.emojis.create(URL, name).then(emoji => {
                {
                    emojiName: emoji.name
                }
                message.channel.send(
                   {embeds:[ new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`**Vous avez ajouté un émoji:** ${emoji}`)]}
                )

            })

            .catch((e) => {
                message.channel.send({embeds:[new Discord.MessageEmbed()
                    .setTitle("[DEBUG MODE]: ")
                    .setDescription(e.message + '\n' + e.stack)]})
            })
        } catch (e) {
            console.log(`[DEBUG EMOJI]:` + "EM145PX\nDonnez ce code en faisant /code {code} en mp")
        }
    }

}