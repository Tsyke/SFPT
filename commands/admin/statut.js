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