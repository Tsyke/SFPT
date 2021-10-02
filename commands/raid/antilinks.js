const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "anti-links",
    permission: "ADMINISTRATOR",
    owner: false,
    aliases: "Aucun",

    async execute(client, message) {
        if (!message.member.permissions.has(this.permission)) return message.reply({ content: "Non authorisé" })
        var logs;
        var DesacEmbed = new MessageEmbed()
            .setTitle('[Modification] Anti-links désactivé')
            .setDescription(`Anti-links désactivé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('GREEN')
            .addField('Modérateur:', `${message.author}`)

        var AcEmbed = new MessageEmbed()
            .setTitle('[Modification] Anti-links activé')
            .setDescription(`Anti-links activé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('RED')
            .addField('Modérateur:', `${message.author}`)

        const guildDoc = await client.GetGuildData(message.guild.id);
        if (!guildDoc) return message.reply({ content: ":warning: Erreur de bot, veuillez enlever et réinviter le bot." });
        else if (guildDoc) {
            if (guildDoc.antilinks === true) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { antilinks: false } })
                message.reply({ content: ":white_check_mark: Anti-links désactivé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [DesacEmbed] })
            } else if (guildDoc.antilinks === false) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { antilinks: true } })
                message.reply({ content: ":warning: Anti-links activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            } else if (!guildDoc.antilinks) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { antilinks: true } })
                message.reply({ content: ":warning: Anti-links activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            }
        }
    },
};