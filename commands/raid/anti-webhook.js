const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "anti-webhook",
    permission: "ADMINISTRATOR",
    owner: false,
    aliases: "Aucun",

    async execute(client, message, args) {
        if (!message.member.permissions.has(this.permission)) return message.reply({ content: "Non authorisé" })
        var logs;
        var DesacEmbed = new MessageEmbed()
            .setTitle('[Modification] Anti-webhook désactivé')
            .setDescription(`Anti-webhook désactivé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('GREEN')
            .addField('Modérateur:', `${message.author}`)

        var AcEmbed = new MessageEmbed()
            .setTitle('[Modification] Anti-webhook activé')
            .setDescription(`Anti-webhook activé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('RED')
            .addField('Modérateur:', `${message.author}`)

        const guildDoc = await client.GetGuildData(message.guild.id);
        if (!guildDoc) return message.reply({ content: ":warning: Erreur de bot, veuillez enlever et réinviter le bot." });
        else if (!args[0]) {
            if (guildDoc.webhook === true) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { webhook: false } })
                message.reply({ content: ":white_check_mark: Anti-webhook désactivé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [DesacEmbed] })
            } else if (guildDoc.webhook === false) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { webhook: true } })
                message.reply({ content: ":warning: Anti-webhook activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            } else if (!guildDoc.webhook) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { webhook: true } })
                message.reply({ content: ":warning: Anti-webhook activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            }
        }
    },
};