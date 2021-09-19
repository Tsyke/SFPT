const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-statut",
    permission: "ADMINISTRATOR",
    aliases: 'Aucun',

    async execute(client, message, args) {
        if (message.author.id !== "805514364277882901") return
        const Bot = require('../../models/bot/bot')
        let statutBot = await Bot.findOne({
            bot: client.user.id,
        })
        if (!args[0]) {
            var Statut;
            Statut = args.join(' ');

            if (statutBot) {
                statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { statut: Statut } })
                var embed = new MessageEmbed()
                    .setDescription(`✅ Statut changé pour \`${Statut}\``)
                    .setColor('GREEN')
                return message.channel.send({
                    embeds: [embed]
                })
            }
        } else if (args[0]) {
            var mode = {
                "dnd": 'Ne pas dérangé',
                "idle": "Innactif",
                "online": "En ligne",
                "offline": "Hors ligne",
                "streaming": "En direct",
            }
            var embed = new MessageEmbed()
                .setDescription(`✅ Statut changé pour \`${mode[args[0]]}\``)
                .setColor('GREEN')
            if (args[0] === "dnd") {
                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { connexion: args[0] } })
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { stream: false } })
                    message.reply({ embeds: [embed] })
                }
            } else if (args[0] === "idle") {
                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { connexion: args[0] } })
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { stream: false } })
                    message.reply({ embeds: [embed] })
                }
            } else if (args[0] === "online") {
                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { connexion: args[0] } })
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { stream: false } })
                    message.reply({ embeds: [embed] })
                }
            } else if (args[0] === "offline") {
                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { connexion: "invisible" } })
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { stream: false } })
                    message.reply({ embeds: [embed] })
                }
            } else if (args[0] === "streaming") {
                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { connexion: args[0] } })
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { stream: true } })
                    message.reply({ embeds: [embed] })
                }
            } else if (args[0] !== "dnd" || "idle" || "online" || "offline" || "streaming") {
                var Statut;
                Statut = args.join(' ');

                if (statutBot) {
                    statutBot = await Bot.findOneAndUpdate({ bot: client.user.id }, { $set: { statut: Statut } })
                    var embed = new MessageEmbed()
                        .setDescription(`✅ Statut changé pour \`${Statut}\``)
                        .setColor('GREEN')
                    return message.channel.send({
                        embeds: [embed]
                    })
                }
            }
        }
    }
}