const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'logs',
    aliases: 'Aucun',
    permission: "ADMINISTRATOR",

    async execute(client, message, args) {
        const logsModel = client.guild

        if (!message.member.permissions.has(this.permission)) return message.channel.send({ content: ":x:Vous n'avez pas la permission administrateur." })

        let channel = message.mentions.channels.first() || args[0];
        if (isNaN(channel)) return message.channel.send({ content: ':x: Veuillez entrer un salon correct comme ceci: ```sfpt.logs mention or 853276055795793981```' })
        let logsDoc = await logsModel.findOne({
            guildID: message.guild.id
        })
        let channelMention = message.guild.channels.cache.get(channel.id || channel)

        if (!logsDoc) {
            logsDoc = new logsModel({
                guildID: message.guild.id,
                logs: channel
            })
            await logsDoc.save().then(
                message.channel.send({ content: '✅ Salon sauvegardé sur: ' + `${channelMention}` })
            )
        }
        if (logsDoc) {
            logsDoc = await logsModel.findOneAndUpdate({ guildID: message.guild.id }, { $set: { logs: channel } }).then(


                message.channel.send({ content: '✅ Salon sauvegardé sur: ' + `${channelMention}` }))
        }
    },
}