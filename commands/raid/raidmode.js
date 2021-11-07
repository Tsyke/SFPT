const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: "raidmode",
    permission: "ADMINISTRATOR",
    owner: false,
    aliases: "Aucun",

    async execute(client, message) {
        if (!message.member.permissions.has(this.permission)) return message.reply({ content: "Non authorisé" })
        var logs;
        var DesacEmbed = new MessageEmbed()
            .setTitle('[Modification] Raidmode désactivé')
            .setDescription(`Raidmode désactivé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('GREEN')
            .addField('Modérateur:', `${message.author}`)

        var AcEmbed = new MessageEmbed()
            .setTitle('[Modification] Raidmode activé')
            .setDescription(`Raidmode activé`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('RED')
            .addField('Modérateur:', `${message.author}`)

        const guildDoc = await client.GetGuildData(message.guild.id);
        if (!guildDoc) return message.reply({ content: ":warning: Erreur de bot, veuillez enlever et réinviter le bot." });
        else if (guildDoc) {
            var mode;
            mode = {
                "true": "Actif",
                "passif": "Passif",
                "false": "Désactiver",
            }
            var op;
            if (guildDoc.passif === false) {
                op = new MessageSelectMenu()
                    .setCustomId('raidmodeMenu')
                    .setPlaceholder(`${mode[guildDoc.raid]}`)
                    .addOptions(
                        [{
                                label: `Activer`,
                                description: `Activer le raidmode`,
                                value: `on`
                            },
                            {
                                label: `Passif`,
                                description: `Raidmode automatique`,
                                value: `passif`
                            },
                            {
                                label: `Désactiver`,
                                description: `Désactiver le raidmode`,
                                value: `off`
                            }
                        ]
                    )

                const row = new MessageActionRow()
                    .addComponents(op)
                await message.reply({ content: 'Choissisez le mode qui vous convient', components: [row] });
            } else if (guildDoc.passif === true) {
                op = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('passifOff')
                        .setLabel('Arrêter le raid')
                        .setStyle('DANGER'),
                    )


                await message.reply({ content: ':warning: Mode passif actif', components: [op] });
            }

            // if (guildDoc.raid === true) {

            //     guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: false } })
            //     message.reply({ content: ":white_check_mark: Raidmode désactivé." })
            //     logs = await message.guild.channels.cache.get(guildDoc.logs)
            //     if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
            //     else logs.send({ embeds: [DesacEmbed] })
            // } else if (guildDoc.raid === false) {

            //     guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: true } })
            //     message.reply({ content: ":warning: Raidmode activé." })
            //     logs = await message.guild.channels.cache.get(guildDoc.logs)
            //     if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
            //     else logs.send({ embeds: [AcEmbed] })

            // } else if (!guildDoc.raid) {

            //     guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { raid: true } })
            //     message.reply({ content: ":warning: Raidmode activé." })
            //     logs = await message.guild.channels.cache.get(guildDoc.logs)
            //     if (!logs) message.channel.send({ content: ":warning: Erreur de logs" });
            //     else logs.send({ embeds: [AcEmbed] })

            // }
        }
    },
};