const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "prefix",
    permission: "ADMINISTRATOR",

    async execute(client, message, args) {
        if (!message.member.permissions.has(this.permission)) return message.reply({ content: "Non authorisé" })
        let guildDoc = await client.GetGuildData(message.guild.id)
        var OldPrefix = guildDoc.prefix;
        var NewPrefix = args[0];

        if (!NewPrefix) {
            return message.channel.send({
                content: ":x: Nouveau prefix manquant"
            })
        } else if (NewPrefix) {

            if (NewPrefix.length > 5) {
                return message.channel.send({
                    content: ":x: Le prefix ne peut contenir plus de 5 caractères."
                })
            } else
                guildDoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { prefix: NewPrefix } })
            var embed = new MessageEmbed()
                .setDescription(`✅ Prefix \`${OldPrefix}\` changé en \`${NewPrefix}\``)
                .setColor('GREEN')
            var LogsEmbed = new MessageEmbed()
                .setTitle('[Modification] Prefix')
                .setDescription(`Prefix \`${OldPrefix}\` changé en \`${NewPrefix}\``)
                .addField('Modérateur:', `${message.author}`)
            var logs = await message.guild.channels.cache.get(guildDoc.logs)
            if (!logs) {
                message.channel.send({ content: ":warning: Erreur de logs" })
            } else {
                logs.send({ embeds: [LogsEmbed] })
            }
            return message.channel.send({
                embeds: [embed]
            })
        }
    }
}