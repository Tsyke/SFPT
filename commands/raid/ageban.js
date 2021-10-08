const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "age-ban",
    permission: "ADMINISTRATOR",
    owner: false,
    aliases: "Aucun",

    async execute(client, message, args, prefix, data, map, guild) {
        if (!message.member.permissions.has(this.permission)) return message.reply({ content: "Non authorisé" })

        var logs;
        var DesacEmbed = new MessageEmbed()
            .setTitle('[Modification] Age-ban désactivé')
            .setDescription(`Age-ban désactivé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('GREEN')
            .addField('Modérateur:', `${message.author}`)

        var AcEmbed = new MessageEmbed()
            .setTitle('[Modification] Age-ban activé')
            .setDescription(`Age-ban activé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('RED')
            .addField('Modérateur:', `${message.author}`)

        const guildDoc = await client.GetGuildData(message.guild.id);
        if (!guildDoc) return message.reply({ content: ":warning: Erreur de bot, veuillez enlever et réinviter le bot." });
        else if (!args[0]) {
            if (guildDoc.ageban === true) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ageban: false } })
                message.reply({ content: ":white_check_mark: Age-ban désactivé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [DesacEmbed] })
            } else if (guildDoc.ageban === false) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ageban: true } })
                message.reply({ content: ":warning: Age-ban activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            } else if (!guildDoc.ageban) {

                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ageban: true } })
                message.reply({ content: ":warning: Age-ban activé." })
                logs = await message.guild.channels.cache.get(guildDoc.logs)
                if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
                else logs.send({ embeds: [AcEmbed] })

            }
        } else if (args[0]) {
            if (args[0] === "set") {
                const jours = args[1];
                if (!args[1]) {
                    return message.channel.send(`:x: Veuillez indiquer le temps en jours`)
                }
                let calcul = jours * 86400000
                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { agebanTime: calcul } })
                message.channel.send(`Le temps d'age ban à été définie sur ${jours} jour(s) par ${message.author}`)
            }
        }
    },
};